import express from 'express'
import { customers, loginUser, logout, validate } from '../controllers/userController.js'
import { registerUser } from '../controllers/userController.js'

const userRouter =express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logout);
userRouter.get('/customers', customers)
userRouter.get('/validate', validate);

export default userRouter