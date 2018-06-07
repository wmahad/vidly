const Genre = require('mongoose').model('genres');
const { admin, auth } = require('../middlewares');

module.exports = (router) => {
    router.get('/genres', async (req, res) => {
        const genres = await Genre.find().sort('name');
        res.send(genres);
    });

    router.get('/genres/:id', async (req, res) => {
        const genre = await Genre.findById(req.params.id);
        if (!genre) return res.status(404).send('genre does not exist');
        res.send(genre);
    });

    router.post('/genres', auth, async (req, res) => {
        // validate params using joi and express-joi-validator.
        const genre = new Genre({ name: req.body.name });
        res.send(await genre.save());
    });

    router.put('/genres/:id', async (req, res) => {
        // validate params using joi and express-joi-validator.
        const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!genre) return res.status(404).send('genre does not exist');
        res.send(genre);
    });

    router.delete('/genres/:id', [auth, admin], async (req, res) => {
        // validate params using joi and express-joi-validator.
        // find genre, if not present return a 404
        // delete genre
        const genre = await Genre.findByIdAndRemove(req.params.id);
        if (!genre) return res.status(404).send('genre does not exist');
        res.send(genre);
    });
}
