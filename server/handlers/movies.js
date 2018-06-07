const mongoose = require('mongoose');
// const { asyncMiddleware } = require('../middlewares');
const Movie = mongoose.model('movies');
const Genre = mongoose.model('genres');

module.exports = (router) => {
    router.get('/movies', async (req, res) => {
        const movies = await Movie.find().sort('name');
        res.send(movies);
    });

    router.get('/movies/:id', async (req, res) => {
        const movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).send('movie does not exist');
        res.send(movie);
    });

    router.post('/movies', async (req, res) => {
        // validate params using joi and express-joi-validator.
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) return res.status(400).send('invalid genre.');
        const movie = new Movie({
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            genre: {
                _id: genre._id,
                name: genre.name,
            },
        });
        res.send(await movie.save());
    });

    router.put('/movies/:id', async (req, res) => {
        // validate params using joi and express-joi-validator.
        // not sure if below logic is required.
        // but if it is, then find movie and update genre for the movie too.
        // const genre = await Genre.findById(req.body.genreId);
        // if (!genre) return res.status(400).send('invalid genre.');
        const movie = await Movie.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!movie) return res.status(404).send('movie does not exist');
        res.send(movie);
    });

    router.delete('/movies/:id', async (req, res) => {
        // validate params using joi and express-joi-validator.
        // find genre, if not present return a 404
        // delete genre
        const movie = await Movie.findByIdAndRemove(req.params.id);
        if (!movie) return res.status(404).send('movie does not exist');
        res.send(movie);
    });
}

// install fawn - simulates transactions in mongo