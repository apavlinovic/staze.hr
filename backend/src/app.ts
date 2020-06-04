require('dotenv').config();
import { Request, Response, NextFunction } from 'express';

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    }),
);

app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
    if (res.headersSent) {
        return next(createError(404));
    }

    return next(createError(500, err));
});

module.exports = app;
