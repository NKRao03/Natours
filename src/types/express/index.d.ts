import { Express } from 'express';

declare global {
  namespace Express {
    interface Request {
      requestTime?: String | undefined;
    }
  }
}
