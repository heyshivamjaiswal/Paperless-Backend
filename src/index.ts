import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { dbConnect } from './db/db';
import authRoute from './routes/userRoute';
import docsRoute from './routes/docsRoute';
import taskRoute from './routes/taskRoute';
import aiApiKeyRoute from './routes/aiKeyRoute';

dotenv.config();

const app = express();

// Middlewares
app.use(
  cors({
    origin: 'https://paperless-backend-49p8.onrender.com',
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/docs', docsRoute);
app.use('/api/tasks', taskRoute);
app.use('/api/ai/key', aiApiKeyRoute);
app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

// Server
const PORT = process.env.PORT || 3000;

dbConnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
