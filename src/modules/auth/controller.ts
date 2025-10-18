import { Request, Response } from 'express';
import { verifySupabaseJWT } from '@/services/supabaseClient';
import { prisma } from '@/services/prisma';
import { sendSuccess, sendUnauthorized, sendServerError, sendConflict, sendNotFound, sendBadRequest } from '@/utils/helpers';
import { asyncHandler } from '@/middleware/errorHandler';
import { User, Prisma } from '@prisma/client'; // Import User model and Prisma

type UserWithAdvocateProfile = Prisma.UserGetPayload<{
  include: { advocateProfile: true };
}>;

const ALLOWED_ROLES = ['STUDENT', 'ADVOCATE', 'ADMIN']; // Define allowed roles

/**
 * Verifies a Supabase JWT token and returns parsed claims or a success indicator.
 */
export const verifyToken = asyncHandler(async (req: Request, res: Response) => {
  try {
    const token = (req.body && req.body.token) || (req.headers.authorization || '').replace('Bearer ', '').trim();

    if (!token) {
      return sendUnauthorized(res, 'No token provided');
    }

    const supabaseUser = await verifySupabaseJWT(token);

    if (!supabaseUser) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    return sendSuccess(res, 'Token verified successfully', { data: supabaseUser });
  } catch (error) {
    console.error('Token verification error:', error);
    return sendUnauthorized(res, 'Invalid or expired token');
  }
});

/**
 * Handles new user registration via Supabase JWT.
 * Creates a local user record with a specified role.
 */
export const handleRegister = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { token, role, name } = req.body;

    if (!token) {
      return sendUnauthorized(res, 'No token provided');
    }
    if (!role) {
      return sendBadRequest(res, 'Role is required for registration');
    }
    if (!ALLOWED_ROLES.includes(role)) {
      return sendBadRequest(res, `Invalid role. Allowed roles are: ${ALLOWED_ROLES.join(', ')}`);
    }

    const supabaseUser = await verifySupabaseJWT(token);

    if (!supabaseUser) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    // Check if local user already exists
    let dbUser: UserWithAdvocateProfile | null = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      include: { advocateProfile: true },
    });

    if (dbUser) {
      return sendConflict(res, 'User already registered');
    }

    const userName = name || (supabaseUser as any).user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User';

    dbUser = await prisma.user.create({
      data: {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        name: userName,
        role: role,
      },
      include: { advocateProfile: true },
    });

    // TODO: Issue backend session token if you use one. For now, returning user data.
    return sendSuccess(res, 'User registered successfully', {
      user: {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        role: dbUser.role,
        avatar: dbUser.avatar,
        isActive: dbUser.isActive,
        advocateProfile: dbUser.advocateProfile,
        createdAt: dbUser.createdAt,
        updatedAt: dbUser.updatedAt,
      },
      backendToken: 'YOUR_BACKEND_JWT_TOKEN_HERE', // Placeholder
    });
  } catch (error) {
    console.error('Registration error:', error);
    return sendServerError(res, 'Failed to register user');
  }
});

/**
 * Handles user login via Supabase JWT.
 * Verifies the token and returns an existing user from the local database.
 */
export const handleLogin = asyncHandler(async (req: Request, res: Response) => {
  try {
    const token = (req.body && req.body.token) || (req.headers.authorization || '').replace('Bearer ', '').trim();

    if (!token) {
      return sendUnauthorized(res, 'No token provided');
    }

    const supabaseUser = await verifySupabaseJWT(token);

    if (!supabaseUser) {
      return sendUnauthorized(res, 'Invalid or expired token');
    }

    // Find user in our database
    const dbUser: UserWithAdvocateProfile | null = await prisma.user.findUnique({
      where: { id: supabaseUser.id },
      include: { advocateProfile: true },
    });

    if (!dbUser) {
      return sendNotFound(res, 'User not found. Please register first.');
    }

    // Optionally update user data if it changed in Supabase
    const updatedName = (supabaseUser as any).user_metadata?.full_name || dbUser.name;
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        email: supabaseUser.email || dbUser.email,
        name: updatedName,
      },
    });

    // Re-fetch to ensure advocateProfile is included after update if it wasn't before
    const updatedDbUser = await prisma.user.findUnique({
      where: { id: dbUser.id },
      include: { advocateProfile: true },
    });

    if (!updatedDbUser) {
      return sendServerError(res, 'Failed to retrieve user after update');
    }

    // TODO: Issue backend session token if you use one. For now, returning user data.
    return sendSuccess(res, 'Login successful', {
      user: {
        id: updatedDbUser.id,
        email: updatedDbUser.email,
        name: updatedDbUser.name,
        role: updatedDbUser.role,
        avatar: updatedDbUser.avatar,
        isActive: updatedDbUser.isActive,
        advocateProfile: updatedDbUser.advocateProfile,
        createdAt: updatedDbUser.createdAt,
        updatedAt: updatedDbUser.updatedAt,
      },
      backendToken: 'YOUR_BACKEND_JWT_TOKEN_HERE', // Placeholder
    });
  } catch (error) {
    console.error('Login error:', error);
    return sendUnauthorized(res, 'Invalid or expired token');
  }
});

/**
 * Get current user profile
 */
export const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  try {
    if (!req.user?.userId) {
      return sendUnauthorized(res, 'User not authenticated');
    }

    const user: UserWithAdvocateProfile | null = await prisma.user.findUnique({
      where: { id: req.user.userId },
      include: { advocateProfile: true },
    });

    if (!user) {
      return sendUnauthorized(res, 'User not found');
    }

    return sendSuccess(res, 'User profile retrieved successfully', {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatar: user.avatar,
        isActive: user.isActive,
        advocateProfile: user.advocateProfile, // Include advocateProfile here
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return sendServerError(res, 'Failed to retrieve user profile');
  }
});
