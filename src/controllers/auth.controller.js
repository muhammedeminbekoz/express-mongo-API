const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors');
const Response = require('../utils/response');
const { createToken } = require('../middlewares/auth');
const crypto = require('crypto')
const sendEmail = require('../utils/sendMail');
const moment = require('moment');

const login = async (req, res) => {
    const { email, password } = req.body;

    const userInfo = await User.findOne({ email });

    if (!userInfo)
        throw new APIError("email yada parola hatalıdır", 401)

    const comparePassword = await bcrypt.compare(password, userInfo.password)

    if (!comparePassword)
        throw new APIError("email yada parola hatalıdır", 401)

    createToken(userInfo, res)
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

const me = async (req, res) => {
    return new Response(req.user).success(res)
}


const forgetPassword = async (req, res) => {
    const { email } = req.body

    const userInfo = await User.findOne({ email }).select(" name lastname email ")

    if (!userInfo) return new APIError("Geçersiz Kullanıcı", 400)

    console.log("userInfo : ", userInfo);

    const resetCode = crypto.randomBytes(3).toString("hex")

    await sendEmail({
        from: process.env.EMAIL_AUTH_USER,
        to: userInfo.email,
        subject: "Şifre Sıfırlama",
        text: `Şifre Sıfırlama Kodunuz ${resetCode}`
    })

    await User.updateOne(
        { email },
        {
            reset: {
                code: resetCode,
                time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
            }
        }
    )

    return new Response(true, "Lütfen Mail Kutunuzu Kontrol Ediniz").success(res)
}

module.exports = {
    login,
    register,
    me,
    forgetPassword
}