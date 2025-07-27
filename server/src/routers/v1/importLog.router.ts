import express from 'express';
import { getAllImportLogsHandler } from '../../controllers/ImportLog.controller';

const importLogRouter = express.Router();

importLogRouter.get('/', getAllImportLogsHandler);

export default importLogRouter;