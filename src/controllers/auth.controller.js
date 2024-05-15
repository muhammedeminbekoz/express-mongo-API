const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');

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

    const saveUser = new User(req.body)
    await saveUser.save()
        .then((data) => {
            return new Response(data, "Kayıt Başarıyla eklendi").created(res)
        }).catch((err) => {
            throw new APIError("Kullanıcı kayıt edilemedi", 400)
        })


}

module.exports = {
    login,
    register
}