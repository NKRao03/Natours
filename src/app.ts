import express, { Request, Response, NextFunction } from 'express';
import { tourRouter } from './routes/tourRoutes';
import { userRouter } from './routes/userRoutes';
import morgan from 'morgan';

const app = express();

//MIDDLEWARE
if(process.env.NODE_ENV === 'development')
app.use(morgan('dev'));
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Hello from the middleware! 😁');
  next();
});
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString();
  next();
});

//ROUTES

//Tours Route
app.use('/api/v1/tours', tourRouter);
//Users Route
app.use('/api/v1/users', userRouter);

export default app;
