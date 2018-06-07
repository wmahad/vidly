const joiErrorHandler = (err, req, res, next) => {
    if (err.isBoom) return res.status(err.output.statusCode).json(err.output.payload);
    next();
}

const admin = (req, res, next) => {
    if (!req.user.isAdmin) return res.status(403).send('Access denied');
    next();
}

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('no token provided');
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
}

const asyncMiddleware = (handler) => {
    return async (req, res, next) => {
        try {
            handler(req, res);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    joiErrorHandler,
    admin,
    auth,
    asyncMiddleware,
};
