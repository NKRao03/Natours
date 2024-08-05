import {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/userControllers';
import express from 'express';

let userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

export { userRouter };
