import { Application, NextFunction } from "express";
import { ErrorRequestHandler } from "express";
import mockedNotes from "./repositories/mockedNotes";

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const NotesRouter = require('./routes/notesRouter');

const app:Application = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/notes', NotesRouter(app, mockedNotes));

const errorHandler: ErrorRequestHandler = (err, req, res, next:NextFunction) => { 
  const { status = 500, message = 'Server error' } = err
  res.status(status).json({ message: err.message })
};

app.use(errorHandler);

module.exports = app;
