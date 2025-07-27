import express from 'express';
import importLogRouter from './importLog.router';

const router = express.Router();

router.use('/importlogs', importLogRouter);

export default router;