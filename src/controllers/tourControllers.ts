import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import { tourModel } from '../models/tourModel';
import TourInterface from '../types/express/tours';

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

//Top 5 cheap middleware
const topfivecheap = (req: Request, res: Response, next: NextFunction) => {
  req.query.sort = 'price,-ratingsAverage';
  req.query.limit = '5';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};

//Other Handlers
const getAllTours = (req: Request, res: Response, next: NextFunction) => {
  //Type casting req.query to TourInterface

  let { sort, fields, limit, page, ...queryparams } = req.query as {
    sort?: string | any;
    fields?: string | any;
    limit?: string | any;
    page?: string | any;
    [key: string]: any;
  };
  let conversion: TourInterface = { ...queryparams };

  //Removing key-value pairs with undefined/NaN values
  //Also converting all numbers to strings
  const filter = Object.entries(conversion).reduce(
    (acc: Partial<TourInterface>, [key, val]) => {
      if (!Number.isNaN(val) && !(val === undefined)) {
        if (
          (key === 'duration' ||
            key === 'maxGroupSize' ||
            key === 'ratingsAverage' ||
            key === 'ratingsQuantity') &&
          typeof val === 'string'
        )
          val = Number(val);

        if (typeof val === 'object' && Object.keys(val).length === 1) {
          let [k, v] = Object.entries(val)[0];
          val = { ['$' + k]: Number(v) };
        }

        acc[key as keyof TourInterface] = val;
      }
      return acc;
    },
    {}
  );
  let query = tourModel.find(filter);

  //Sorting
  if (req.query.sort) {
    sort = sort.split(',').join(' ');
    query = query.sort(sort);
  } else {
    query = query.sort('-createdAt');
  }

  //Projection
  if (req.query.fields) {
    fields = fields.split(',').join(' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v');
  }

  //Pagination
  const page_v = +req.query.page! || 1;
  const limit_v = +req.query.limit! || 100;
  const skip: number = (page_v - 1) * limit;
  query = query.skip(skip).limit(limit_v);

  query.then((tours) => {
    res.status(200).json({
      status: 'success',
      length: tours.length,
      data: { tours },
    });
  });
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

export {
  topfivecheap,
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
};
