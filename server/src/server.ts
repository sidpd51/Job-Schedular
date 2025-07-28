import express from 'express';
import { serverConfig } from './config';
import { getMongoClient } from './config/mongo.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { appErrorHandler } from './middlewares/error.middleware';
import router from './routers/v1';
import { startWorker } from './workers/job.worker';
import { startCronJobs } from './cronJobs/job.cron';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { logger } from './config/logger.config';
import { getAllImportLogsService } from './services/ImportLog.service';


const app = express();
app.use(express.json());
app.use(cors({ origin: serverConfig.FRONTEND_URL }));

const httpServer = createServer(app);


const PORT: number = serverConfig.PORT;

const io = new Server(httpServer, {
    cors: {
        origin: serverConfig.FRONTEND_URL,
        methods: ['GET']
    }
})

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', router);
app.use(appErrorHandler);

io.on('connection', (socket) => {
    console.log('A client connected:', socket.id);

    socket.on('getImportLogs', async ({ page = 1, limit = 10 }, callback) => {
        try {
            const logs = await getAllImportLogsService(page, limit);
            logger.info('Sent import logs to client via Socket.IO');
            callback({
                success: true,
                message: 'Got all ImportLogs successfully',
                data: logs,
            });
        } catch (error) {
            logger.error('Error fetching import logs for Socket.IO:', error);
            callback({
                success: false,
                message: 'Failed to fetch import logs',
                data: {},
            });
        }
    });

    socket.on('disconnect', () => {
        console.log('A client disconnected:', socket.id);
    });
});

httpServer.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await getMongoClient();
    startCronJobs();
    startWorker();
});