const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { auth } = require('../middlewares');

const User = mongoose.model('users');


module.exports = (router) => {
    router.get('/auth/me', auth, async (req, res) => {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    });

    router.post('/auth/register', async (req, res) => {
        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('User already registered.');
        user = new User({ name: re.body.name, email: req.body.email, password: req.body.password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        user = await user.save();
        const {name, email, _id} = user;
        res.header('x-auth-token', user.generateAuthToken()).send({name, email, _id});
    });

    router.post('/auth/login', async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('Invalid email or password.');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).send('Invalid email or password.');
        res.send(user.generateAuthToken());
    });
};
