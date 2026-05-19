import { Router } from 'express';
import { AuthController } from '@/controllers/AuthController';
import { validate, authenticate, authLimiter } from '@/middleware';
import { registerSchema, loginSchema, refreshTokenSchema } from '@/validators/authValidator';

const router = Router();

// Public routes
router.post(
  '/register',
  authLimiter,
  validate(registerSchema),
  AuthController.register
);

router.post(
  '/login',
  authLimiter,
  validate(loginSchema),
  AuthController.login
);

router.post(
  '/refresh-token',
  validate(refreshTokenSchema),
  AuthController.refreshToken
);

// Protected routes
router.post(
  '/logout',
  authenticate,
  AuthController.logout
);

export default router;
