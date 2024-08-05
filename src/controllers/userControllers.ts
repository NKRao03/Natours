import { Request, Response, NextFunction } from 'express';

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {};
const createUser = (req: Request, res: Response, next: NextFunction) => {};
const getUser = (req: Request, res: Response, next: NextFunction) => {};
const deleteUser = (req: Request, res: Response, next: NextFunction) => {};
const updateUser = (req: Request, res: Response, next: NextFunction) => {};

export { getAllUsers, getUser, createUser, deleteUser, updateUser };
