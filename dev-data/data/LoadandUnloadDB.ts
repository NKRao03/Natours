import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '../../../.env' });
import mongoose from 'mongoose';
import fs from 'fs';
import { tourModel } from '../../src/models/tourModel';

//read JSON file
const Tours = fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8');

const options = {
  dbName: 'natours',
  useNewUrlParser: true,
};
mongoose
  .connect(process.env.CONNECTION_STRING!)
  .then((res) => {
    console.log('DB Connection Successful!');
  })
  .catch((e) => {
    console.log(e);
  });

const loadData = async () => {
  await tourModel.insertMany(JSON.parse(Tours));
  console.log('Tours loaded successfully');
  // .then((res) => {
  //   console.log('TOurs loaded successfully');
  // })
  // .catch((e) => {
  //   console.log(e);
  // });
  process.exit();
};

const deleteData = async () => {
  await tourModel.deleteMany();
  console.log('Tours deleted successfully');
  // .then((res) => {

  // })
  // .catch((e) => {
  //   console.log(e);
  // });
  process.exit();
};
if (process.argv[2] === '--load') loadData();
if (process.argv[2] === '--delete') deleteData();
if (process.argv[2] === undefined)
  console.log('Kindly specify options(load or delete)');
