import { Router } from 'express';
import { handleLogin, handleSignUp } from '../controllers/authController.js';

const authRouter = Router();
 
authRouter.post('/signup', handleSignUp);
authRouter.post('/login', handleLogin);

export default authRouter;