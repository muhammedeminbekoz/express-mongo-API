const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');

const login = async (req, res) => {
    console.log(req.body);

    return res.json(res.body)
}

const register = async (req, res) => {
    const { email } = req.body

    const userCheck = await User.findOne({ email })

    if (userCheck) {
        throw new APIError("girmiş olduğunuz email kullanımda", 401)
    }

    req.body.password = await bcrypt.hash(req.body.password, 10)

    console.log("hash şifre", req.body.password)

    try {
        const saveUser = new User(req.body)
        await saveUser.save()
            .then((response) => {
                return res.status(201).json({ success: true, data: response })
            }).catch((err) => {
                console.log(err)
                return res.status(400).json({ success: false, data: err })
            })
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = {
    login,
    register
}