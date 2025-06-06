import express from 'express';
import authMiddleware from '../middleware/auth.js'
import { addToCart, removerFromCard, getCart } from '../controllers/cartController.js';

const cartRouter = express.Router();
cartRouter.post('/add', authMiddleware, addToCart);
cartRouter.post('/remove',authMiddleware, removerFromCard);
cartRouter.post('/get',authMiddleware, getCart);

export default cartRouter

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2Q4Zjk2ZjRiYWVkMTFiZTgzODMwMyIsImlhdCI6MTc0MTUyNDg4N30.5VXS8ylS0EsJewUWcclndcPlli-iH8lEOouxQjj1m08
