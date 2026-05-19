import { Router } from 'express';
import { authenticate } from '@/middleware';

const router = Router();

// Vehicle routes will be added here
router.get(
  '/',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Get all vehicles endpoint',
    });
  }
);

router.post(
  '/',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Create vehicle endpoint',
    });
  }
);

export default router;
