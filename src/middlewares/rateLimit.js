const rateLimit = require('express-rate-limit');

const allowList = ['::1']

const limiter = rateLimit({
    windowMs: 15 * 60 * 100,
    max: (req, res) => {
        if (req.url == '/login' || req.url == '/register') return 5
        else return 2
    },
    message: {
        success: false,
        message: "çok fazla istekte bulundunuz"
    },
    skip: (req, res) => allowList.includes(req.ip),
    standardHeaders: 'draft-7',
    legacyHeaders: false,

})

module.exports = limiter