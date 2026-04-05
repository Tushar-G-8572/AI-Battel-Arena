import {
    handleGetMeController, 
    handleLoginController, 
    handleRegisterController, 
    handleVerifyEmailController 
} from '../controller/auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = Router();


authRouter.post('/register',handleRegisterController);
authRouter.get('/verify-email',handleVerifyEmailController);
authRouter.post('/login',handleLoginController);
authRouter.get('/get-me',authMiddleware,handleGetMeController);

export default authRouter;