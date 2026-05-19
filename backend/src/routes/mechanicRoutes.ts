import { Router } from 'express';
import { authenticate, authorize } from '@/middleware';
import { UserRole } from '@/types';

const router = Router();

// Mechanic routes will be added here
router.get(
  '/nearby',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Nearby mechanics endpoint',
    });
  }
);

router.get(
  '/available',
  authenticate,
  (req, res) => {
    res.json({
      success: true,
      message: 'Available mechanics endpoint',
    });
  }
);

router.post(
  '/:id/accept',
  authenticate,
  authorize(UserRole.MECHANIC),
  (req, res) => {
    res.json({
      success: true,
      message: 'Accept request endpoint',
    });
  }
);

export default router;
