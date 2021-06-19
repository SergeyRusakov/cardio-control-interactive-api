const AUTH_HEADER = 'X-AUTH';

module.exports = async function auth (req, res, next) {
    res.locals._id = req.header(AUTH_HEADER) || '';
    next();
};
