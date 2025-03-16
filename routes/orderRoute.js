import express from 'express';
import { listOrder, placeOrder, userOrders, verifyPayment, updateStatus } from '../controllers/orderController.js';
import authMiddleware from '../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.post('/place', authMiddleware, placeOrder);
orderRouter.post('/verify', verifyPayment);
orderRouter.post('/userorders', authMiddleware, userOrders);
orderRouter.get('/list',  listOrder);
orderRouter.post('/status', updateStatus);


export default orderRouter;