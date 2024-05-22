const joi = require('joi')
const APIError = require('../../utils/errors');


class authValidation {
    constructor() { }

    static register = async (req, res, next) => {
        try {
            await joi.object({
                firstname: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "isim alanı metin olmalıdır",
                    "string.empty": "isim alanı boş olamaz",
                    "string.min": "isim alanı en az 3 karakterden oluşmalıdır",
                    "string.max": "isim alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "isim alanı zorunludur"
                }),
                lastname: joi.string().trim().min(3).max(50).required().messages({
                    "string.base": "soyisim alanı metin olmalıdır",
                    "string.empty": "soyisim alanı boş olamaz",
                    "string.min": "soyisim alanı en az 3 karakterden oluşmalıdır",
                    "string.max": "soyisim alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "soyisim alanı zorunludur"
                }),
                email: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "email alanı metin olmalıdır",
                    "string.empty": "email alanı boş olamaz",
                    "string.min": "email alanı en az 3 karakterden oluşmalıdır",
                    "string.email": "lütfen geçerli bir email giriniz",
                    "string.max": "email alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "email alanı zorunludur"
                }),
                password: joi.string().trim().min(6).max(50).required().messages({
                    "string.base": "parola alanı metin olmalıdır",
                    "string.empty": "parola alanı boş olamaz",
                    "string.min": "parola alanı en az 6 karakterden oluşmalıdır",
                    "string.max": "parola alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "parola alanı zorunludur"
                })
            }).validateAsync(req.body)
            next();
        } catch (error) {
            if (error && error?.details[0].message) throw new APIError(error?.details[0].message, 400)
            else throw new APIError("lütfen validasyon kurallarına uyunuz", 400)
        }

    }
    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().email().trim().min(3).max(50).required().messages({
                    "string.base": "email alanı metin olmalıdır",
                    "string.empty": "email alanı boş olamaz",
                    "string.min": "email alanı en az 3 karakterden oluşmalıdır",
                    "string.email": "lütfen geçerli bir email giriniz",
                    "string.max": "email alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "email alanı zorunludur"
                }),
                password: joi.string().trim().min(6).max(50).required().messages({
                    "string.base": "parola alanı metin olmalıdır",
                    "string.empty": "parola alanı boş olamaz",
                    "string.min": "parola alanı en az 6 karakterden oluşmalıdır",
                    "string.max": "parola alanı en fazla 50 karakterden oluşmalıdır",
                    "string.required": "parola alanı zorunludur"
                })
            }).validateAsync(req.body);
        }
        catch (error) {
            if (error && error?.details[0].message) throw new APIError(error?.details[0].message, 400)
            else throw new APIError("lütfen validasyon kurallarına uyunuz", 400)
        }
        next();
    }
}

module.exports = authValidation;