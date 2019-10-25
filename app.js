const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

// import routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const glossaryRouter = require('./routes/glossary')
const url = 'mongodb+srv://NormalAccess:H3lioTr%40ining@cluster0-1xd3l.mongodb.net/test?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let appPack = client.connect()
  .then(connection => {

    const app = express();
    app.locals.collection = connection.db('Helio').collection("glossary");

    console.log("Connected to DB")

    // 'mongodb+srv://NormalAccess:H3lioTr%40ining@cluster0-1xd3l.mongodb.net/test?retryWrites=true&w=majority'
    // H3lioTr%40ining


    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    // built in middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, 'public')));


    // third party middleware
    app.use(cors())
    app.use(logger('dev'));
    app.use(cookieParser());

    // bind routes
    app.use('/', indexRouter);
    app.use('/users', usersRouter);
    app.use('/glossary', glossaryRouter);


    // catch 404 and forward to error handler
    app.use(function (req, res, next) {
      next(createError(404));
    });

    // error handler
    app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    return {
      client,
      app
    }
  })
  .catch(error => {
    console.log("You Stupid Idiot", error)
  })

module.exports = appPack;
