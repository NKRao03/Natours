import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import * as fs from 'fs';

const app = express();

//getting Tours data
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`).toString()
);

//MIDDLEWARE
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

//HANDLERS

//Tours Handlers
const getAllTours = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    length: tours.length,
    data: { tours },
  });
  next();
};
const createTour = (req: Request, res: Response, next: NextFunction) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const getTour = (req: Request, res: Response, next: NextFunction) => {
  try {
    const tour = tours.filter((t:any) => t.id === Number(req.params.id))
    if (tour === undefined || tour === null || tour.length === 0) {
      throw new Error();
    }
    res.status(200).json({
      status: 'Success',
      data: {
        tour
      },
    });
  } catch (e) {
    res.status(404).json({
      status: 'Fail',
      data: {
        Error: 'Incorrect ID',
      },
    });
  }
};
const deleteTour = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tour = tours.filter((t:any) => t.id === Number(req.params.id))
      if (tour === undefined || tour === null || tour.length === 0) {
        throw new Error();
      }
      tours.filter((t:any) => t.id !== tour.id)
      res.status(201).json({
        status: 'Success',
        data: {
          tour,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: 'Fail',
        data: {
          Error: 'Incorrect ID',
        },
      });
    }
};
const updateTour = (req: Request, res: Response, next: NextFunction) => {
    try {
      let tour = tours.filter((t:any) => t.id === Number(req.params.id))
      if (tour === undefined || tour === null || tour.length === 0) {
        throw new Error();
      }
      tour = {...tour, ...req.body}
      console.log(tour);
      tours[Number(req.params.id)] = tour;
      res.status(201).json({
        status: 'Success',
        data: {
          tour,
        },
      });
    } catch (e) {
      res.status(404).json({
        status: 'Fail',
        data: {
          Error: 'Incorrect ID',
        },
      });
    }
};

//Users Handlers
const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};
const createUser = (req: Request, res: Response, next: NextFunction) => {};
const getUser = (req: Request, res: Response, next: NextFunction) => {};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {};
const updateUser = (req: Request, res: Response, next: NextFunction) => {};

//ROUTES

//Tours Route
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour)
  .patch(updateTour);

//Users Route
app.route('/api/v1/users').get(getAllUsers).post(createUser);
app
  .route('/api/v1/users/:id')
  .get(getUser)
  .delete(deleteUser)
  .patch(updateUser);

//START SERVER
const port = 3000;
app.listen(port, () => {
  console.log(`App running in Port ${port}`);
});
