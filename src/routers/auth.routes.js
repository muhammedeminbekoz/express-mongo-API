const router = require('express').Router();
const { login, register } = require('../controllers/auth.controller');
const authValidation = require('../middlewares/validation/auth.validation')

router.post('/login', login);
router.post('/register', authValidation.register, register);


module.exports = router;