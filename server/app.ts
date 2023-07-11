import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { limiter, corsOptions } from './config/express';
import userRouter from './app/routes/users';
import { globalErrorHandler } from './app/middleware/middleware';
import taskRouter from './app/routes/tasks';

const app = express();
const port = process.env.PORT || 3003;

//middlewares
app.use(cors(corsOptions));
app.use('/api', limiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(globalErrorHandler);
app.use(morgan('common'));
app.use(helmet());

//routes
app.use('/api/users', userRouter);
app.use('/api/tasks', taskRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
