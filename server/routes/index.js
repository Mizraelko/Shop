const Router = require('express');
const router = new Router();
const deviceRouter = require('./device/deviceRouter');
const brandRouter = require('./brand/brandRoutes');
const typeRoutes = require('./type/typeRoutes');
const userRoutes = require('./user/userRoutes');

router.use('/user', userRoutes);
router.use('/type', typeRoutes);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);



module.exports = router;