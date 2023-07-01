const router = require('express').Router();
const { getLogin, postLogin, getRegister, postRegister, getLogout } = require('../controllers/Auth/login.controller');


router.get('/login', getLogin);
router.post('/login', postLogin);
router.get('/register', getRegister);
router.post('/register', postRegister);
router.get('/logout', getLogout);

module.exports = router;
