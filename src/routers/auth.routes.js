const router = require('express').Router();
const { login, register, me, forgetPassword } = require('../controllers/auth.controller');
const authValidation = require('../middlewares/validation/auth.validation');
const { tokenCheck } = require('../middlewares/auth.js');

router.post('/login', authValidation.login, login);
router.post('/register', authValidation.register, register);
router.get('/me', tokenCheck, me)
router.post('/forgetpassword', forgetPassword)

module.exports = router;