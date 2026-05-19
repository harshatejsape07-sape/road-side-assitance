import { Router } from 'express';
import { authenticate } from '@/middleware';

const router = Router();

// Review routes will be added here
router.post(
  '/',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Create review endpoint',
    });
  }
);

router.get(
  '/mechanic/:mechanicId',
  (req, res) => {
    res.json({
      success: true,
      message: 'Get mechanic reviews endpoint',
    });
  }
);

export default router;
