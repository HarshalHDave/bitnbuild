/**
 * index route file of device platform.
 * @description: exports all routes of device platform.
 */
const express =  require('express');
const router =  express.Router();
router.use('/device/auth',require('./auth'));
router.use(require('./spaceRoutes'));
router.use(require('./transactionRoutes'));
router.use(require('./productRoutes'));
router.use(require('./userRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
