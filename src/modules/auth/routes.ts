import { Router } from 'express';
import { handleLogin, handleRegister, getCurrentUser, verifyToken } from './controller';
import { verifyToken as verifyTokenMiddleware } from '@/middleware/auth';

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Creates a new local user record with a specified role after verifying a Supabase JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - role
 *             properties:
 *               token:
 *                 type: string
 *                 description: Supabase JWT token
 *               role:
 *                 type: string
 *                 description: User's role (e.g., 'STUDENT', 'ADVOCATE', 'ADMIN')
 *               name:
 *                 type: string
 *                 description: Optional user name
 *     responses:
 *       201:
 *         description: User registered successfully
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     backendToken:
 *                       type: string
 *                       description: Backend session JWT token
 *       400:
 *         description: Bad request (e.g., missing role, invalid role)
 *       401:
 *         description: Invalid or missing Supabase token
 *       409:
 *         description: User already registered
 *       500:
 *         description: Internal server error
 */
router.post('/register', handleRegister);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log in an existing user
 *     description: Verifies a Supabase JWT token and returns an existing user from the local database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Supabase JWT token
 *     responses:
 *       200:
 *         description: User logged in successfully
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *                     backendToken:
 *                       type: string
 *                       description: Backend session JWT token
 *       401:
 *         description: Invalid or missing Supabase token
 *       404:
 *         description: User not found (not registered)
 *       500:
 *         description: Internal server error
 */
router.post('/login', handleLogin);

/**
 * @swagger
 * /auth/verify-token:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Verify Supabase JWT token
 *     description: Verifies a Supabase JWT token and returns parsed claims or a success indicator.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Supabase JWT token
 *     responses:
 *       200:
 *         description: Token verified successfully
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
 *                     data:
 *                       type: object
 *                       description: Parsed Supabase JWT claims
 *       401:
 *         description: Invalid or missing token
 */
router.post('/verify-token', verifyToken);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user profile
 *     description: Get the profile of the currently authenticated user using a backend session token.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
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
 *                     user:
 *                       $ref: '#/components/schemas/User'
 *       401:
 *         description: User not authenticated or invalid backend token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get('/me', verifyTokenMiddleware, getCurrentUser);

export default router;
