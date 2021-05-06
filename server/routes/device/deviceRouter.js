const Router = require('express');
const router = new Router();
const deviceController = require('./deviceController');
const checkRoleMiddleware = require('../../middleware/checkRoleMiddleware');

router.post('/',checkRoleMiddleware('ADMIN'), deviceController.create);
router.get('/', deviceController.getAll);
router.get('/:id', deviceController.getOne);
router.delete('/:id', checkRoleMiddleware('ADMIN'), deviceController.deleteDevice)



module.exports = router;