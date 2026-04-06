import {
    handleGetMeController, 
    handleLoginController, 
    handleRegisterController, 
    handleVerifyEmailController 
} from '../controller/auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { handleGoogleAuthController,handleGoogleCallbackController } from '../controller/googleAuth.controller.js';

const authRouter = Router();


authRouter.post('/register',handleRegisterController);
authRouter.get('/verify-email',handleVerifyEmailController);
authRouter.post('/login',handleLoginController);
authRouter.get('/get-me',authMiddleware,handleGetMeController);

authRouter.get('/google',handleGoogleAuthController);
authRouter.get('/google/callback',handleGoogleCallbackController);

export default authRouter;