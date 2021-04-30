const Router = require('express');
const router = new Router();
const userController = require('./UserController');

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.get('/auth', userController.check)



module.exports = router;