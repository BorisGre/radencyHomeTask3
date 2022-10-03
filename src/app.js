import { Application, Request, Response, NextFunction } from "express";
import type { ErrorRequestHandler } from "express";

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const notesRouter = require('./routes/notes');

const app:Application = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/notes', notesRouter);

app.use((req:Request, res:Response) => {
  res.status(404).json({ message: 'Not found' })
});

const errorHandler: ErrorRequestHandler = (err, req, res, next:NextFunction) => { 
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: err.message })
};

app.use(errorHandler);

module.exports = app;
