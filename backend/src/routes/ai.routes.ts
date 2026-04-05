import {Router} from 'express'
import { handleRunGraph } from '../controller/ai.controller.js';

const aiRouter = Router();

aiRouter.post('/arena',handleRunGraph);

export default aiRouter;