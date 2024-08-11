import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { tourModel } from '../models/tourModel';
let Tour = new tourModel();
//getting Tours data locally
// let tours = JSON.parse(
//   fs
//     .readFileSync(`${__dirname}/../../dev-data/data/tours-simple.json`)
//     .toString()
// );

//Middleware handler param function for checking ID
// const checkID = (
//   req: Request,
//   res: Response,
//   next: NextFunction,
//   val: string
// ) => {
//   const id = Number(val);
//   let tourMaxID = tours.map((t: any) => t.id);
//   tourMaxID = Math.max(...tourMaxID);
//   if (val > tourMaxID) {
//     res.status(404).json({
//       status: 'Fail',
//       data: {
//         Error: 'Incorrect ID',
//       },
//     });
//   } else next();
// };

//Other Handlers
const getAllTours = (req: Request, res: Response, next: NextFunction) => {
  tourModel.find().then((tours) =>
    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: { tours },
    })
  );
};
const createTour = (req: Request, res: Response, next: NextFunction) => {
  tourModel.create(req.body).then((tour) => {
    res.status(201).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  });
};
const getTour = (req: Request, res: Response, next: NextFunction) => {
  tourModel.findById(req.params.id).then((tour) => {
    res.status(200).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  });
};
const deleteTour = (req: Request, res: Response, next: NextFunction) => {
  tourModel.findByIdAndDelete(req.params.id).then(() => {
    res.status(201).json({
      status: 'Success',
    });
  });
};
const updateTour = (req: Request, res: Response, next: NextFunction) => {
  let neededtour;
  tourModel.findByIdAndUpdate(req.params.id, req.body).then((tour) => {
    neededtour = tour;
    res.status(201).json({
      status: 'Success',
      data: {
        tour,
      },
    });
  });
};

export { getAllTours, getTour, createTour, deleteTour, updateTour };
