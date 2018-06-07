require('express-async-errors');
const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

// load all models
require('./models')();
// new routes
require('./handlers')(app, express.Router());

app.listen(PORT, (err) => {
    if (err) throw new Error(err);
    console.log(`server running on port: ${PORT} ...`);
});