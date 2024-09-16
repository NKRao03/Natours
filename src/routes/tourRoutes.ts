import express from 'express';
import {
  getAllTours,
  getTour,
  createTour,
  deleteTour,
  updateTour,
  topfivecheap,
} from '../controllers/tourControllers';

let tourRouter = express.Router();

tourRouter.route('/top-5-cheap').get(topfivecheap, getAllTours);

// tourRouter.param('id', checkID);
tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).delete(deleteTour).patch(updateTour);

export { tourRouter };
