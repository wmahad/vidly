const mongoose = require('mongoose');

module.exports = () => {
    // connect to db
    mongoose.connect(process.env.DB_URI)
        .then(() => console.log('connected to database...'))
        .catch(err => {
            console.error('could not connect to database');
            process.exit(1)
        });

    // require models.
    require('./genre');
    require('./movie');
    require('./rental');
    require('./customer');
    require('./user');
}