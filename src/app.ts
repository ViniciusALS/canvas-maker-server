import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json({ limit: '10kb' }));
app.use(helmet());

app.use('/api', routes);

export default app;
