import express from 'express';
import helmet from 'helmet';

import routes from './routes';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(helmet());

app.use('/api', routes);

export default app;
