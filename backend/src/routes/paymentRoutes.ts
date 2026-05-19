import { Router } from 'express';
import { authenticate } from '@/middleware';

const router = Router();

// Payment routes will be added here
router.post(
  '/',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Create payment endpoint',
    });
  }
);

router.get(
  '/:id',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Get payment details endpoint',
    });
  }
);

export default router;
