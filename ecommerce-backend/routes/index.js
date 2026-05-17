import express from 'express';
import { getAllProducts } from '../controllers/productController.js';
import { getAllDeliveryOptions } from '../controllers/deliveryOptionController.js';
import {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem
} from '../controllers/cartController.js';
import {
  getAllOrders,
  createOrder,
  getOrderById
} from '../controllers/orderController.js';
import { getPaymentSummary } from '../controllers/paymentSummaryController.js';
import { resetDatabase } from '../controllers/resetController.js';

const router = express.Router();

// Products routes
router.get('/products', getAllProducts);

// Delivery options routes
router.get('/delivery-options', getAllDeliveryOptions);

// Cart items routes
router.get('/cart-items', getCartItems);
router.post('/cart-items', addCartItem);
router.put('/cart-items/:productId', updateCartItem);
router.delete('/cart-items/:productId', deleteCartItem);

// Orders routes
router.get('/orders', getAllOrders);
router.post('/orders', createOrder);
router.get('/orders/:orderId', getOrderById);

// Payment summary routes
router.get('/payment-summary', getPaymentSummary);

// Reset routes
router.post('/reset', resetDatabase);

export default router;
