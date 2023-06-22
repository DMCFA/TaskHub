import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import { limiter } from './config/express';
import userRouter from './app/routes/users';
import { globalErrorHandler } from './app/middleware/middleware';

const app = express();
const port = process.env.PORT || 3003;

//middlewares
app.use('/api', limiter);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(globalErrorHandler);
app.use(morgan('common'));
app.use(helmet());

//routes
app.use('/api/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
