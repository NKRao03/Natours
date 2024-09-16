import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../.env'});
import mongoose from 'mongoose';
import app from "./app";

const options = {
  dbName: "natours", 
}
mongoose.connect(process.env.CONNECTION_STRING!, options)
.then((res) => {
  console.log("DB Connection Successful!");
})
.catch((e) => {
  console.log(e);
})

//START SERVER
app.listen(process.env.PORT, () => {
  console.log(`App running in Port ${process.env.PORT}`);
});
