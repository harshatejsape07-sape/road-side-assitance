import { User, IUser } from '@/models/User';
import { AppError } from '@/middleware';
import jwt from 'jsonwebtoken';
import { config } from '@/config';
import Logger from '@/config/logger';
import { UserRole, JwtPayload } from '@/types';

const logger = Logger.getLogger('AuthService');

interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
}

interface LoginPayload {
  email: string;
  password: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static generateTokens(user: IUser): AuthTokens {
    const payload: JwtPayload = {
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    };

    const accessToken = jwt.sign(payload, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });

    const refreshToken = jwt.sign(payload, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpire,
    });

    return { accessToken, refreshToken };
  }

  static async register(payload: RegisterPayload): Promise<{ user: IUser; tokens: AuthTokens }> {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: payload.email }, { phone: payload.phone }],
    });

    if (existingUser) {
      throw new AppError(
        400,
        'User already exists with this email or phone number'
      );
    }

    // Create new user
    const user = new User(payload);
    await user.save();

    logger.info(`User registered: ${user.email}`);

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Convert to plain object and remove password
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { user: userObj as IUser, tokens };
  }

  static async login(payload: LoginPayload): Promise<{ user: IUser; tokens: AuthTokens }> {
    // Find user with password field
    const user = await User.findOne({ email: payload.email }).select('+password');

    if (!user) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Check if user is blocked
    if (user.isBlocked) {
      throw new AppError(403, 'User account is blocked');
    }

    // Compare passwords
    const isPasswordValid = await user.comparePassword(payload.password);

    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid email or password');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    logger.info(`User logged in: ${user.email}`);

    // Generate tokens
    const tokens = this.generateTokens(user);

    // Convert to plain object and remove password
    const userObj = user.toObject();
    delete (userObj as any).password;

    return { user: userObj as IUser, tokens };
  }

  static async verifyToken(token: string): Promise<JwtPayload> {
    try {
      const decoded = jwt.verify(token, config.jwtSecret) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new AppError(401, 'Invalid or expired token');
    }
  }

  static async refreshTokens(refreshToken: string): Promise<AuthTokens> {
    try {
      const decoded = jwt.verify(refreshToken, config.jwtRefreshSecret) as JwtPayload;
      
      // Find user and generate new tokens
      const user = await User.findById(decoded.id);
      
      if (!user || user.isBlocked) {
        throw new AppError(401, 'User not found or blocked');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new AppError(401, 'Invalid refresh token');
    }
  }

  static async logout(userId: string): Promise<void> {
    logger.info(`User logged out: ${userId}`);
    // Additional logout logic can be added here (e.g., blacklist token)
  }
}

export default AuthService;
