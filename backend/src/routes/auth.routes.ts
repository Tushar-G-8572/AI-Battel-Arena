import { handleGetMeController, handleLoginController, handleRegisterController } from '../controller/auth.controller.js'
import { Router } from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js';

const authRouter = Router();


authRouter.post('/register',handleRegisterController);
authRouter.post('/login',handleLoginController);
authRouter.get('/get-me',authMiddleware,handleGetMeController);

export default authRouter;