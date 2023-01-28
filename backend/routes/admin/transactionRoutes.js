/**
 * transactionRoutes.js
 * @description :: CRUD API routes for transaction
 */

const express = require('express');
const router = express.Router();
const transactionController = require('../../controller/admin/transactionController');
const { PLATFORM } =  require('../../constants/authConstant'); 
const auth = require('../../middleware/auth');
const checkRolePermission = require('../../middleware/checkRolePermission');
router.route('/admin/transaction/create').post(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.addTransaction);
router.route('/admin/transaction/list').post(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.findAllTransaction);
router.route('/admin/transaction/count').post(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.getTransactionCount);
router.route('/admin/transaction/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.getTransaction);
router.route('/admin/transaction/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.updateTransaction);    
router.route('/admin/transaction/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.partialUpdateTransaction);
router.route('/admin/transaction/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.softDeleteTransaction);
router.route('/admin/transaction/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.softDeleteManyTransaction);
router.route('/admin/transaction/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.bulkInsertTransaction);
router.route('/admin/transaction/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.bulkUpdateTransaction);
router.route('/admin/transaction/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.deleteTransaction);
router.route('/admin/transaction/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,transactionController.deleteManyTransaction);

module.exports = router;
