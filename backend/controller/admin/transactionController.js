/**
 * transactionController.js
 * @description :: exports action methods for transaction.
 */

const Transaction = require('../../model/transaction');
const transactionSchemaKey = require('../../utils/validation/transactionValidation');
const validation = require('../../utils/validateRequest');
const dbService = require('../../utils/dbService');
const models = require('../../model');
const utils = require('../../utils/common');

/**
 * @description : create record of Transaction in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Transaction. {status, message, data}
 */ 
const addTransaction = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      transactionSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdTransaction = await dbService.createOne(Transaction,dataToCreate);
    return  res.success({ data :createdTransaction });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Transaction in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Transactions. {status, message, data}
 */
const bulkInsertTransaction = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdTransaction = await dbService.createMany(Transaction,dataToCreate); 
      return  res.success({ data :{ count :createdTransaction.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Transaction from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Transaction(s). {status, message, data}
 */
const findAllTransaction = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundTransaction;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      transactionSchemaKey.findFilterKeys,
      Transaction.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundTransaction = await dbService.count(Transaction, query);
      if (!foundTransaction) {
        return res.recordNotFound();
      } 
      foundTransaction = { totalRecords: foundTransaction };
      return res.success({ data :foundTransaction });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundTransaction = await dbService.paginate( Transaction,query,options);
    if (!foundTransaction){
      return res.recordNotFound();
    }
    return res.success({ data:foundTransaction }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Transaction from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Transaction. {status, message, data}
 */
const getTransaction = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundTransaction = await dbService.findOne(Transaction,{ id :id });
    if (!foundTransaction){
      return res.recordNotFound();
    }
    return  res.success({ data :foundTransaction });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Transaction.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getTransactionCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      transactionSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedTransaction = await dbService.count(Transaction,where);
    if (!countedTransaction){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedTransaction } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Transaction with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Transaction.
 * @return {Object} : updated Transaction. {status, message, data}
 */
const updateTransaction = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body || {} };
    let query = {};
    delete dataToUpdate.addedBy;
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }          
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      transactionSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedTransaction = await dbService.update(Transaction,query,dataToUpdate);
    return  res.success({ data :updatedTransaction }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Transaction with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Transactions.
 * @return {Object} : updated Transactions. {status, message, data}
 */
const bulkUpdateTransaction = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedTransaction = await dbService.update(Transaction,filter,dataToUpdate);
    if (!updatedTransaction){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedTransaction.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Transaction with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Transaction.
 * @return {Object} : updated Transaction. {status, message, data}
 */
const partialUpdateTransaction = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      transactionSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedTransaction = await dbService.update(Transaction, query, dataToUpdate);
    if (!updatedTransaction) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedTransaction });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Transaction from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Transaction.
 * @return {Object} : deactivated Transaction. {status, message, data}
 */
const softDeleteTransaction = async (req, res) => {
  try {
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let result = await dbService.update(Transaction, query,updateBody);
    if (!result){
      return res.recordNotFound();
    }
    return  res.success({ data :result });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Transaction from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Transaction. {status, message, data}
 */
const deleteTransaction = async (req, res) => {
  const result = await dbService.deleteByPk(Transaction, req.params.id);
  return  res.success({ data :result });
};

/**
 * @description : delete records of Transaction in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManyTransaction = async (req, res) => {
  try {
    let dataToDelete = req.body;
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }              
    let query = { id:{ $in:dataToDelete.ids } };
    let deletedTransaction = await dbService.destroy(Transaction,query);
    return res.success({ data :{ count :deletedTransaction.length } });
  }
  catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Transaction from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Transaction.
 * @return {Object} : number of deactivated documents of Transaction. {status, message, data}
 */
const softDeleteManyTransaction = async (req, res) => {
  try {
    let ids = req.body.ids;
    if (!ids){
      return res.badRequest({ message : 'Insufficient request parameters! ids is required.' });
    }
    const query = { id:{ $in:ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    const options = {};
    let updatedTransaction = await dbService.update(Transaction,query,updateBody, options);
    if (!updatedTransaction) {
      return res.recordNotFound();
    }
    return  res.success({ data :{ count: updatedTransaction.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addTransaction,
  bulkInsertTransaction,
  findAllTransaction,
  getTransaction,
  getTransactionCount,
  updateTransaction,
  bulkUpdateTransaction,
  partialUpdateTransaction,
  softDeleteTransaction,
  deleteTransaction,
  deleteManyTransaction,
  softDeleteManyTransaction,
};
