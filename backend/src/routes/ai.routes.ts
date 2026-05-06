import {Router} from 'express'
import { handleGetBattleHistory, handleRunGraph,handleGetAllProblems } from '../controller/ai.controller.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const aiRouter = Router();

aiRouter.post('/arena',authMiddleware,handleRunGraph);

aiRouter.get('/battleHistory/:battleId',authMiddleware,handleGetBattleHistory);

aiRouter.get('/problems',authMiddleware,handleGetAllProblems);

export default aiRouter;