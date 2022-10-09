"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routes_1 = require("./routes/routes");
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
(0, routes_1.Routes)(app);
const errorHandler = (err, req, res, next) => {
    const { status = 500, message = 'Server error' } = err;
    res.status(status).json({ message: err.message });
};
app.use(errorHandler);
const port = 3000;
app.listen(port, () => console.log(`server is listening on ${port}`))
    .on("error", (err) => console.error(err));
