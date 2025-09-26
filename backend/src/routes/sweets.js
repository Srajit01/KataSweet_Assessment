const { Router } = require('express');
const {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} = require('../controllers/sweetController');
const { authenticate, authorize } = require('../middleware/auth');

const router = Router();

// Protected routes (require authentication)
router.use(authenticate);

router.get('/', getSweets);
router.get('/search', searchSweets);
router.post('/:id/purchase', purchaseSweet);

// Admin only routes
router.post('/', authorize('admin'), createSweet);
router.put('/:id', authorize('admin'), updateSweet);
router.delete('/:id', authorize('admin'), deleteSweet);
router.post('/:id/restock', authorize('admin'), restockSweet);

module.exports = router;