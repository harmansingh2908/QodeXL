import express from "express";
import routes from "./Routes";
import appConfig from "./Configs";
import dbConfig from "./Configs";
import mongoose from "mongoose";
import { ValidationError } from "express-validation";
let {errors} = require('celebrate') 

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors())

// Custom server error handler
app.use((err, req, res, next) => {
  if (err) {
    console.error(err.message)
    if (!err.statusCode) {err.statusCode = 500} 
    return res.status(err.statusCode).send({
      statusCode: 400,
      message: err.message
    })
  }

  next()
})

app.use('/user', routes.user)
app.use('/post', routes.post)

const env = require("./env");

let appDetail = appConfig.app.dev;
if (appConfig.app[env.instance]) {
  appDetail = appConfig.app[env.instance];
}

let db = dbConfig.db.dev;
if (dbConfig.db[env.instance]) {
  db = dbConfig.db[env.instance];
}

let { port, host } = appDetail;
app.listen(port, host, () => {
  console.log(
    "+++++++++++++++++++++++ SERVER STARTED +++++++++++++++++++++++++++ \n\r Server running at:" +
      appDetail.host +
      ":" +
      appDetail.port
  );
});

const mongoUrl = "mongodb://" + db.host + ":" + db.port + "/" + db.database;

//Connect to MongoDB
mongoose.connect(mongoUrl, function (err) {
  if (err) {
    console.log("DB Error: ", err);
    process.exit(1);
  } else {
    console.log("MongoDB Connected", mongoUrl);
  }
});
