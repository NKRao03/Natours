import dotenv from 'dotenv';
dotenv.config({path: __dirname+'/../.env'});

import app from "./app";


//START SERVER
app.listen(process.env.PORT, () => {
  console.log(`App running in Port ${process.env.PORT}`);
});
