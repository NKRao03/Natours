import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';

//getting Tours data
let tours = JSON.parse(
  fs
    .readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
    .toString()
);

//Middleware handler param function for checking ID
const checkID = (
  req: Request,
  res: Response,
  next: NextFunction,
  val: string
) => {
  const id = Number(val);
  let tourMaxID = tours.map((t: any) => t.id);
  tourMaxID = Math.max(...tourMaxID);
  if (val > tourMaxID) {
    res.status(404).json({
      status: 'Fail',
      data: {
        Error: 'Incorrect ID',
      },
    });
  } else next();
};

//Other Handlers
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
        length: tours.length,
        data: {
          tour: newTour,
        },
      });
    }
  );
};
const getTour = (req: Request, res: Response, next: NextFunction) => {
  const tour = tours.filter((t: any) => t.id === Number(req.params.id));
  res.status(200).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};
const deleteTour = (req: Request, res: Response, next: NextFunction) => {
  const tour = tours.filter((t: any) => t.id === Number(req.params.id));
  tours = tours.filter((t: any) => t.id !== tour.id);
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'Success',
        length: tours.length,
        data: {
          tour,
        },
      });
    }
  );
};
const updateTour = (req: Request, res: Response, next: NextFunction) => {
  let tour = tours.filter((t: any) => t.id === Number(req.params.id));
  tour = { ...tour, ...req.body };
  console.log(tour);
  tours[Number(req.params.id)] = tour;
  res.status(201).json({
    status: 'Success',
    data: {
      tour,
    },
  });
};

export { getAllTours, getTour, createTour, deleteTour, updateTour, checkID };
