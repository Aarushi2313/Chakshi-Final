import { Request, Response } from 'express';
import { prisma } from '@/services/prisma';
import { sendSuccess, sendServerError, sendNotFound } from '@/utils/helpers';
import { asyncHandler } from '@/middleware/errorHandler';
import { generateSignedDownloadUrl } from '@/services/storage'; // Assuming a storage service for signed URLs
import { CaseStatus, Document, RiskLevel } from '@prisma/client'; // Import CaseStatus, Document, and RiskLevel

/**
 * Get a summary of documents for the authenticated user.
 */
export const getDocumentsSummary = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const userId = req.user.userId;

    // Total documents
    const totalDocuments = await prisma.document.count({
      where: { uploaderId: userId },
    });

    // Active cases (documents linked to active cases)
    const activeCasesCount = await prisma.case.count({
      where: {
        advocateId: userId,
        status: 'ACTIVE',
        documents: {
          some: {
            uploaderId: userId,
          },
        },
      },
    });

    // Storage used (sum of sizeBytes)
    const storageUsedResult = await prisma.document.aggregate({
      _sum: {
        sizeBytes: true,
      },
      where: { uploaderId: userId },
    });
    const storageUsed = storageUsedResult._sum.sizeBytes ? parseFloat((Number(storageUsedResult._sum.sizeBytes) / (1024 * 1024)).toFixed(2)) : 0; // Convert bytes to MB

    // Average risk score
    const avgRiskScoreResult = await prisma.document.aggregate({
      _avg: {
        riskScore: true,
      },
      where: { uploaderId: userId, riskScore: { not: null } },
    });
    const avgRiskScore = avgRiskScoreResult._avg.riskScore ? parseFloat(avgRiskScoreResult._avg.riskScore.toFixed(1)) : 0;

    // OCR processed documents
    const ocrProcessed = await prisma.document.count({
      where: { uploaderId: userId, ocrStatus: true },
    });

    // Placeholder for growth metrics (these would typically come from historical data)
    const growth = {
      documents: 0, // Example: percentage increase over last month
      cases: 0,
      storage: 0,
      risk: 0,
    };

    return sendSuccess(res, 'Documents summary retrieved successfully', {
      totalDocuments,
      activeCases: activeCasesCount,
      storageUsed,
      avgRiskScore,
      ocrProcessed,
      growth,
    });
  } catch (error) {
    console.error('Get documents summary error:', error);
    return sendServerError(res, 'Failed to retrieve documents summary');
  }
});

/**
 * Upload a new document.
 */
export const uploadDocument = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    // Assuming file is uploaded via multer and available in req.file
    // For now, we'll simulate the file data from req.body for demonstration
    // In a real scenario, req.file would contain:
    // {
    //   fieldname: 'document',
    //   originalname: 'example.pdf',
    //   encoding: '7bit',
    //   mimetype: 'application/pdf',
    //   destination: './uploads',
    //   filename: '12345-example.pdf',
    //   path: 'uploads\\12345-example.pdf',
    //   size: 123456
    // }

    const {
      caseId,
      clientId,
      docType,
      title,
      summary,
      tags,
      language,
      // For actual file upload, these would come from req.file
      fileName, // originalName
      sizeBytes, // size
      storagePath // path or key in storage
    } = req.body; // Temporarily using req.body for file details

    if (!fileName || !storagePath || !sizeBytes) {
      return sendServerError(res, 'File details (fileName, storagePath, sizeBytes) are required');
    }

    const newDocument = await prisma.document.create({
      data: {
        caseId,
        clientId,
        uploaderId: req.user.userId,
        docType,
        storagePath,
        originalName: fileName,
        title: title || fileName,
        sizeBytes: BigInt(sizeBytes),
        summary,
        tags: tags || [],
        language,
        // Default values for new fields
        version: '1.0',
        riskScore: 0, // Default or calculated later
        riskLevel: 'LOW', // Default or calculated later
        views: 0,
        downloads: 0,
        ocrStatus: false,
        reviewStatus: 'PENDING',
      },
    });

    return sendSuccess(res, 'Document uploaded successfully', { document: newDocument }, 201);
  } catch (error) {
    console.error('Upload document error:', error);
    return sendServerError(res, 'Failed to upload document');
  }
});

/**
 * Trigger OCR scan on an uploaded document.
 */
export const triggerOcrScan = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const { id } = req.params; // Document ID from path parameter
    const userId = req.user.userId;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document || document.uploaderId !== userId) {
      return sendNotFound(res, 'Document not found or unauthorized access');
    }

    if (document.ocrStatus) {
      return sendSuccess(res, 'OCR already processed for this document', { document }, 200);
    }

    // Simulate OCR processing (in a real scenario, this would be an external service call)
    const simulatedOcrText = `OCR text for document: ${document.originalName}. This is a simulated OCR result.`;
    const updatedDocument = await prisma.document.update({
      where: { id },
      data: {
        ocrStatus: true,
        ocrText: simulatedOcrText,
        modifiedDate: new Date(),
      },
    });

    return sendSuccess(res, 'OCR scan triggered successfully', { document: updatedDocument });
  } catch (error) {
    console.error('Trigger OCR scan error:', error);
    return sendServerError(res, 'Failed to trigger OCR scan');
  }
});

/**
 * Get a paginated and filterable list of documents for the authenticated user.
 */
export const getDocuments = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const userId = req.user.userId;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const caseId = req.query.caseId as string;
    const needsReview = req.query.needsReview !== undefined ? String(req.query.needsReview).toLowerCase() === 'true' : undefined;
    const docType = req.query.docType as string; // Corresponds to DocumentType enum
    const language = req.query.language as string; // New filter for language
    const search = req.query.search as string; // New filter for search

    const skip = (page - 1) * limit;

    let whereClause: any = {
      uploaderId: userId, // Use uploaderId from schema
    };

    if (caseId) {
      whereClause.caseId = caseId;
    }
    if (needsReview !== undefined) {
      whereClause.reviewStatus = needsReview ? 'PENDING' : undefined; // Map needsReview to reviewStatus
    }
    if (docType) {
      whereClause.docType = docType; // Use docType from schema
    }
    if (language) {
      whereClause.language = language; // Filter by language
    }
    if (search) {
      whereClause.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { summary: { contains: search, mode: 'insensitive' } },
        { ocrText: { contains: search, mode: 'insensitive' } },
        { originalName: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { uploadedAt: 'desc' },
        include: {
          uploader: { select: { id: true, name: true } }, // Include uploader details for 'uploadedBy'
          case: { select: { id: true, title: true } }, // Include case details
        },
      }),
      prisma.document.count({ where: whereClause }),
    ]);

    // Format documents to match the desired response structure
    const formattedDocuments = documents.map(doc => ({
      id: doc.id,
      title: doc.title || doc.originalName,
      fileName: doc.originalName,
      size: doc.sizeBytes ? `${(Number(doc.sizeBytes) / (1024 * 1024)).toFixed(2)} MB` : 'N/A',
      version: doc.version,
      caseId: doc.caseId,
      riskScore: doc.riskScore,
      riskLevel: doc.riskLevel,
      summary: doc.summary,
      tags: doc.tags,
      status: doc.reviewStatus, // Using reviewStatus as status
      uploadedBy: doc.uploader?.name || 'Unknown',
      uploadedAt: doc.uploadedAt.toISOString(),
      modifiedDate: doc.modifiedDate?.toISOString(),
      views: doc.views,
      downloads: doc.downloads,
      ocrStatus: doc.ocrStatus,
      language: doc.language,
    }));

    return sendSuccess(res, 'Documents retrieved successfully', {
      documents: formattedDocuments,
      total,
      page,
      limit,
    });
  } catch (error) {
    console.error('Get documents error:', error);
    return sendServerError(res, 'Failed to retrieve documents');
  }
});

/**
 * Get a single document by ID for the authenticated user, including detailed metadata.
 */
export const getDocumentById = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        uploader: { select: { id: true, name: true } },
        case: { select: { id: true, title: true } },
        client: { select: { id: true, name: true } },
      },
    });

    if (!document || document.uploaderId !== userId) {
      return sendNotFound(res, 'Document not found or unauthorized access');
    }

    // Format document to match the desired response structure
    const formattedDocument = {
      id: document.id,
      title: document.title || document.originalName,
      fileName: document.originalName,
      size: document.sizeBytes ? `${(Number(document.sizeBytes) / (1024 * 1024)).toFixed(2)} MB` : 'N/A',
      version: document.version,
      caseId: document.caseId,
      riskScore: document.riskScore,
      riskLevel: document.riskLevel,
      summary: document.summary,
      tags: document.tags,
      status: document.reviewStatus, // Using reviewStatus as status
      uploadedBy: document.uploader?.name || 'Unknown',
      uploadedAt: document.uploadedAt.toISOString(),
      modifiedDate: document.modifiedDate?.toISOString(),
      views: document.views,
      downloads: document.downloads,
      ocrStatus: document.ocrStatus,
      language: document.language,
      ocrText: document.ocrText,
      // signedUrl: 'placeholder_signed_url', // This will be generated by a separate endpoint
    };

    return sendSuccess(res, 'Document retrieved successfully', { document: formattedDocument });
  } catch (error) {
    console.error('Get document by ID error:', error);
    return sendServerError(res, 'Failed to retrieve document');
  }
});

/**
 * Generate a time-limited signed URL for a document.
 */
export const getSignedUrl = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const { id } = req.params;
    const userId = req.user.userId;

    const document = await prisma.document.findUnique({
      where: { id },
    });

    if (!document || document.uploaderId !== userId) { // Use uploaderId from schema
      return sendNotFound(res, 'Document not found or unauthorized access');
    }

    // Assuming generateSignedUrl function exists in '@/services/storage'
    // It should take storagePath and return a time-limited URL
    const signedUrl = await generateSignedDownloadUrl(document.storagePath);

    return sendSuccess(res, 'Signed URL generated successfully', { signedUrl });
  } catch (error) {
    console.error('Get signed URL error:', error);
    return sendServerError(res, 'Failed to generate signed URL');
  }
});

/**
 * Compare selected documents.
 */
export const compareDocuments = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const { doc1Id, doc2Id } = req.query;

    if (!doc1Id || !doc2Id) {
      return sendServerError(res, 'Both doc1Id and doc2Id are required for comparison');
    }

    const [document1, document2] = await Promise.all([
      prisma.document.findUnique({ where: { id: doc1Id as string } }),
      prisma.document.findUnique({ where: { id: doc2Id as string } }),
    ]);

    if (!document1 || !document2) {
      return sendNotFound(res, 'One or both documents not found');
    }

    // Ensure user has access to both documents (e.g., uploaderId matches)
    if (document1.uploaderId !== req.user.userId || document2.uploaderId !== req.user.userId) {
      return sendNotFound(res, 'Access denied to one or both documents');
    }

    // Simulate comparison logic
    const summary = `Comparison between "${document1.originalName}" and "${document2.originalName}".`;
    const differences = {
      contentLength: (document1.ocrText?.length || 0) - (document2.ocrText?.length || 0),
      // Add more sophisticated comparison logic here
    };
    const similarities = {
      docType: document1.docType === document2.docType,
      caseId: document1.caseId === document2.caseId,
    };
    const riskAssessment = 'Simulated risk assessment based on differences.';

    const comparisonResult = await prisma.documentComparison.create({
      data: {
        doc1Id: document1.id,
        doc2Id: document2.id,
        summary,
        differences,
        similarities,
        riskAssessment,
        createdBy: req.user.userId,
      },
    });

    return sendSuccess(res, 'Documents compared successfully', { comparison: comparisonResult });
  } catch (error) {
    console.error('Compare documents error:', error);
    return sendServerError(res, 'Failed to compare documents');
  }
});

/**
 * Bulk export selected documents.
 */
export const exportDocuments = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendServerError(res, 'User not authenticated');
    }

    const { documentIds } = req.query; // Expecting a comma-separated string of IDs

    if (!documentIds) {
      return sendServerError(res, 'Document IDs are required for export');
    }

    const idsArray = (documentIds as string).split(',');

    const documentsToExport = await prisma.document.findMany({
      where: {
        id: {
          in: idsArray,
        },
        uploaderId: req.user.userId, // Ensure user owns the documents
      },
      select: {
        id: true,
        originalName: true,
        storagePath: true,
        ocrText: true, // Include OCR text for export
        title: true,
        summary: true,
        tags: true,
        language: true,
      },
    });

    if (documentsToExport.length === 0) {
      return sendNotFound(res, 'No documents found for the given IDs or unauthorized access');
    }

    // Simulate bundling documents for export (e.g., into a ZIP file)
    // In a real application, this would involve fetching files from storage,
    // zipping them, and then providing a download link.
    const exportFileName = `exported_documents_${Date.now()}.zip`;
    const simulatedExportLink = `/exports/${exportFileName}`; // Placeholder link

    return sendSuccess(res, 'Documents prepared for export successfully', {
      exportedCount: documentsToExport.length,
      exportLink: simulatedExportLink,
      documents: documentsToExport.map(doc => ({
        id: doc.id,
        title: doc.title || doc.originalName,
        fileName: doc.originalName,
        language: doc.language,
        summary: doc.summary,
        ocrText: doc.ocrText,
      })),
    });
  } catch (error) {
    console.error('Export documents error:', error);
    return sendServerError(res, 'Failed to export documents');
  }
});
