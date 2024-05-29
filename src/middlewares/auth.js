const jwt = require('jsonwebtoken');
const APIError = require('../utils/errors');
const User = require('../models/user.model');

const createToken = async (user, res) => {
    const payload = {
        sub: user.id,
        name: user.name,
    }
    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
    res.status(201).json({ success: true, token, message: "Başarılı" });
}

const tokenCheck = async (req, res, next) => {
    const headerToken = req?.headers?.authorization?.startsWith("Bearer")
    if (!headerToken)
        throw new APIError("Geçersiz oturum litfen Oturum açın", 401)

    const token = req.headers.authorization.split(" ")[1]

    await jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) throw new APIError("Geçersiz Token", 401)

        const userInfo = await User.findById(decoded.sub).select("_id firstname lastname email")

        if (!userInfo) throw new APIError("Geçersiz token", 401)

        req.user = userInfo;

    })
    next();


}

module.exports = {
    createToken,
    tokenCheck
}