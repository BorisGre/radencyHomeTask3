import { Application, NextFunction, ErrorRequestHandler} from "express";
import { Routes } from "./routes/routes";

const express = require('express');
const app:Application = express();

const bodyParser = require('body-parser')
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

Routes(app)

const errorHandler: ErrorRequestHandler = (err, req, res, next:NextFunction) => { 
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: err.message })
};

app.use(errorHandler);

const port: Number = 3000
app.listen(port, () => console.log(`server is listening on ${port}`))
   .on("error", (err:any) => console.error(err));

