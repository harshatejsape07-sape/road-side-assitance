import { Request, Response } from 'express';
import { AuthService } from '@/services/AuthService';
import { asyncHandler } from '@/middleware';
import { UserRole } from '@/types';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const { firstName, lastName, email, phone, password, role } = req.body;

    const { user, tokens } = await AuthService.register({
      firstName,
      lastName,
      email,
      phone,
      password,
      role: role || UserRole.CUSTOMER,
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user,
        tokens,
      },
    });
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const { user, tokens } = await AuthService.login({
      email,
      password,
    });

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: {
        user,
        tokens,
      },
    });
  });

  static logout = asyncHandler(async (req: Request, res: Response) => {
    if (req.user) {
      await AuthService.logout(req.user.id);
    }

    res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  });

  static refreshToken = asyncHandler(async (req: Request, res: Response) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new Error('Refresh token is required');
    }

    const tokens = await AuthService.refreshTokens(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Tokens refreshed successfully',
      data: tokens,
    });
  });
}

export default AuthController;
