const path = require('path');
const express = require('express');

module.exports = (app, router) => {
    // set views engine and the source
    app.set('view engine', 'pug');
    app.set('views', path.join(__dirname, 'views'));
    // middleware to allow json
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // 3rd-party middle-wares
    app.use(require('helmet')());
    if (process.env.NODE_ENV === 'development') app.use(require('morgan')('tiny'));

    // define routes here.
    app.get('/', (req, res) => {
        res.send('we working baby!!!');
    });
    app.use('/api', router);
    require('./auth')(router);
    require('./genres')(router);
    require('./movies')(router);
    require('./rentals')(router);
    require('./customers')(router);
    // Example error handler for joi validations
    app.use(require('../middlewares').joiErrorHandler);
}
