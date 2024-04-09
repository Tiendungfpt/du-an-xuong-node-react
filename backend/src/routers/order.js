import { Router } from 'express';
import order from '../models/order';
import { createOrder, getOrders, getOrdersById } from '../controllers/order';

const router = Router();

router.post('/order', createOrder);
router.get('/order', getOrders);
router.get('/order/:userId/:orderId', getOrdersById);

export default router;