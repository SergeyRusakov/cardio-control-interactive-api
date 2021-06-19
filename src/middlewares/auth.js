const AUTH_HEADER = 'X-AUTH';

export const auth = async function (req, res, next) {
    res.locals._id = req.header(AUTH_HEADER) || '';
    next();
};
