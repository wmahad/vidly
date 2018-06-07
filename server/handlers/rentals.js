const mongoose = require('mongoose');
const Fawn = require('fawn');
// const { asyncMiddleware } = require('../middlewares');

Fawn.init(mongoose);
const Rental = mongoose.model('rentals');
const Movie = mongoose.model('movies');
const Customer = mongoose.model('customers');

module.exports = (router) => {
    router.get('/rentals', async (req, res) => {
        const rentals = await rentals.find().sort('-dateOut');
        res.send(rentals);
    });

    router.get('/rentals/:id', async (req, res) => {
        const rental = await Rental.findById(req.params.id);
        if (!rental) return res.status(404).send('rental not found');
        res.send(rental);
    });

    router.post('/rentals', async (req, res) => {
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Invalid customer.');
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('Invalid movie.');
        if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');
        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            }
        });
        try {
            new Fawn.Task()
                .save('rentals', rental)
                .update('movies', { _id: movie._id }, {
                    $inc: { numberInStock: -1 }
                })
                .run();

            res.send(rental);
        } catch(ex) {
            res.status(500).send('Something failed.');
        }
    });
};
