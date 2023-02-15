import express from "express";
import mongoose from "mongoose";
import router from "./router.js";

const PORT = 4000;
const DB_URL =
  "mongodb+srv://user:user@cluster0.wp7lons.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');

  next();
}); 
app.use('/api', router);

async function startApp() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL, {});
    app.listen(PORT, () => console.log("SERVER WORKING ON PORT " + PORT));
  } catch (e) {
    console.log(e);
  }
}

startApp();
