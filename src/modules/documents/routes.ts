import { Router } from 'express';
import { getSignedUrl, getDocuments, getDocumentsSummary, getDocumentById, uploadDocument, compareDocuments, exportDocuments } from './controller'; // Added uploadDocument, compareDocuments, exportDocuments
import { verifyToken } from '@/middleware/auth';

const router = Router();

/**
 * @swagger
 * /documents/summary:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get a summary of documents for the authenticated user
 *     description: Retrieve aggregated data for document management dashboard cards.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Document summary retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalDocuments: { type: integer }
 *                     activeCases: { type: integer }
 *                     storageUsed: { type: number, format: "float" }
 *                     avgRiskScore: { type: number, format: "float" }
 *                     ocrProcessed: { type: integer }
 *                     growth:
 *                       type: object
 *                       properties:
 *                         documents: { type: integer }
 *                         cases: { type: integer }
 *                         storage: { type: integer }
 *                         risk: { type: integer }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /documents:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get a list of documents for the authenticated user
 *     description: Retrieve a paginated and filterable list of documents.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: caseId
 *         schema:
 *           type: string
 *         description: Filter documents by associated case ID
 *       - in: query
 *         name: needsReview
 *         schema:
 *           type: boolean
 *         description: Filter documents by review status
 *       - in: query
 *         name: docType
 *         schema:
 *           type: string
 *           enum: [LEGAL_DOCUMENT, EVIDENCE, CONTRACT, CERTIFICATE, OTHER]
 *         description: Filter documents by type
 *       - in: query
 *         name: language
 *         schema:
 *           type: string
 *         description: Filter documents by language
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search documents by title or summary
 *     responses:
 *       200:
 *         description: List of documents retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     documents:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id: { type: string }
 *                           title: { type: string }
 *                           fileName: { type: string }
 *                           size: { type: string }
 *                           version: { type: string }
 *                           caseId: { type: string }
 *                           riskScore: { type: integer }
 *                           riskLevel: { type: string }
 *                           summary: { type: string }
 *                           tags: { type: array, items: { type: string } }
 *                           status: { type: string }
 *                           uploadedBy: { type: string }
 *                           uploadedAt: { type: string, format: "date-time" }
 *                           modifiedDate: { type: string, format: "date-time" }
 *                           views: { type: integer }
 *                           downloads: { type: integer }
 *                           ocrStatus: { type: boolean }
 *                     total:
 *                       type: integer
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /documents/{id}:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Get detailed information for a single document
 *     description: Retrieve a document's metadata, OCR text, and risk report by ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Document retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     document:
 *                       type: object
 *                       properties:
 *                         id: { type: string }
 *                         title: { type: string }
 *                         fileName: { type: string }
 *                         size: { type: string }
 *                         version: { type: string }
 *                         caseId: { type: string }
 *                         riskScore: { type: integer }
 *                         riskLevel: { type: string }
 *                         summary: { type: string }
 *                         tags: { type: array, items: { type: string } }
 *                         status: { type: string }
 *                         uploadedBy: { type: string }
 *                         uploadedAt: { type: string, format: "date-time" }
 *                         modifiedDate: { type: string, format: "date-time" }
 *                         views: { type: integer }
 *                         downloads: { type: integer }
 *                         ocrStatus: { type: boolean }
 *                         language: { type: string }
 *                         ocrText: { type: string }
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 *       500:
 *         description: Server error
 *
 * /documents/upload:
 *   post:
 *     tags:
 *       - Documents
 *     summary: Upload a new document
 *     description: Uploads a new document to storage and creates a corresponding database entry.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *                 description: The document file to upload.
 *               caseId:
 *                 type: string
 *                 description: Optional ID of the associated case.
 *               clientId:
 *                 type: string
 *                 description: Optional ID of the associated client.
 *               docType:
 *                 type: string
 *                 enum: [LEGAL_DOCUMENT, EVIDENCE, CONTRACT, CERTIFICATE, OTHER]
 *                 description: The type of document.
 *               title:
 *                 type: string
 *                 description: The title of the document.
 *               summary:
 *                 type: string
 *                 description: A brief summary of the document.
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Tags associated with the document.
 *               language:
 *                 type: string
 *                 description: The language of the document.
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success: { type: boolean }
 *                 message: { type: string }
 *                 data:
 *                   type: object
 *                   properties:
 *                     document:
 *                       type: object
 *                       properties:
 *                         id: { type: string }
 *                         title: { type: string }
 *                         fileName: { type: string }
 *                         sizeBytes: { type: integer }
 *                         caseId: { type: string }
 *                         uploaderId: { type: string }
 *                         docType: { type: string }
 *                         uploadedAt: { type: string, format: "date-time" }
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *
 * /documents/{id}/signed-url:
 *   get:
 *     tags:
 *       - Documents
 *     summary: Generate a time-limited signed URL for a document
 *     description: Returns a pre-signed URL to access a specific document from storage.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the document
 *     responses:
 *       200:
 *         description: Signed URL generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     signedUrl:
 *                       type: string
 *                       format: url
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Document not found
 *       500:
 *         description: Server error
 */
router.post('/upload', verifyToken, uploadDocument); // New route for document upload
router.get('/summary', verifyToken, getDocumentsSummary); // New route for document summary
router.get('/', verifyToken, getDocuments);
router.get('/:id', verifyToken, getDocumentById); // New route for detailed document view
router.get('/compare', verifyToken, compareDocuments); // New route for document comparison
router.get('/export', verifyToken, exportDocuments); // New route for bulk document export
router.get('/:id/signed-url', verifyToken, getSignedUrl);

export default router;
