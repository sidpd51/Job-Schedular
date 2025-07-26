import express from 'express';
import { serverConfig } from './config';
import { getMongoClient } from './config/mongo.config';
import { attachCorrelationIdMiddleware } from './middlewares/correlation.middleware';
import { appErrorHandler } from './middlewares/error.middleware';
import router from './routers/v1';
import { startWorker } from './workers/job.worker';
import { fetchAndInsert } from './services/feedToQueue.service';


const app = express();
app.use(express.json());


const PORT: number = serverConfig.PORT;

app.use(attachCorrelationIdMiddleware);
app.use('/api/v1', router);
app.use(appErrorHandler);

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await getMongoClient();
    // const data = await fetchJobsFromXML(serverConfig.URL);
    // console.log(data.length);
    await fetchAndInsert();
    setTimeout(() => {
        startWorker();
    }, 5000);
});