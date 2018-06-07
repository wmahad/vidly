const Customer = require('mongoose').model('customers');
// const { asyncMiddleware } = require('../middlewares');

module.exports = (router) => {
    router.get('/customers', async (req, res) => {
        const customers = await Customer.find().sort('name');
        res.send(customers);
    });

    router.get('/customers/:id', async (req, res) => {
        const customer = await Customer.findById(req.params.id);
        if (!customer) return res.status(404).send('customer does not exist');
        res.send(customer);
    });

    router.post('/customers', async (req, res) => {
        // validate params using joi and express-joi-validator.
        const customer = new Customer({
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone,
        });
        res.send(await customer.save());
    });

    router.put('/customers/:id', async (req, res) => {
        // validate params using joi and express-joi-validator.
        const customer = await Customer.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
        if (!customer) return res.status(404).send('customer does not exist');
        res.send(customer);
    });

    router.delete('/customers/:id', async (req, res) => {
        // validate params using joi and express-joi-validator.
        // find genre, if not present return a 404
        // delete genre
        const customer = await Customer.findByIdAndRemove(req.params.id);
        if (!customer) return res.status(404).send('customer does not exist');
        res.send(customer);
    });
}
