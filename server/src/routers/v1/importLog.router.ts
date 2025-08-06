import express from 'express';
import { getAllImportsHandler } from '../../controllers/ImportLog.controller';

const importLogRouter = express.Router();

importLogRouter.get('/', getAllImportsHandler);

export default importLogRouter;