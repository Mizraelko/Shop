const Router = require('express');
const typeController = require('./typeController');
const router = new Router();
const checkRoleMiddleware = require('../../middleware/checkRoleMiddleware')

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create);
router.get('/',typeController.getAll);



module.exports = router;