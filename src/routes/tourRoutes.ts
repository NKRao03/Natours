import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
} from '../controllers/tourControllers';

let tourRouter = express.Router();

// tourRouter.param('id', checkID);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export { tourRouter };
