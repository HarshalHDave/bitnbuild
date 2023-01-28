/**
 * transactionRoutes.js
 * @description :: CRUD API routes for transaction
 */

const express = require('express');
const router = express.Router();
const transactionController = require('../../../controller/device/v1/transactionController');
const { PLATFORM } =  require('../../../constants/authConstant'); 
const auth = require('../../../middleware/auth');
const checkRolePermission = require('../../../middleware/checkRolePermission');
router.route('/device/api/v1/transaction/create').post(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.addTransaction);
router.route('/device/api/v1/transaction/list').post(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.findAllTransaction);
router.route('/device/api/v1/transaction/count').post(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.getTransactionCount);
router.route('/device/api/v1/transaction/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.getTransaction);
router.route('/device/api/v1/transaction/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.updateTransaction);    
router.route('/device/api/v1/transaction/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.partialUpdateTransaction);
router.route('/device/api/v1/transaction/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.softDeleteTransaction);
router.route('/device/api/v1/transaction/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.softDeleteManyTransaction);
router.route('/device/api/v1/transaction/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.bulkInsertTransaction);
router.route('/device/api/v1/transaction/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.bulkUpdateTransaction);
router.route('/device/api/v1/transaction/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.deleteTransaction);
router.route('/device/api/v1/transaction/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,transactionController.deleteManyTransaction);

module.exports = router;
