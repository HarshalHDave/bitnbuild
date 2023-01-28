/**
 * spaceController.js
 * @description :: exports action methods for space.
 */

const Space = require('../../../model/space');
const spaceSchemaKey = require('../../../utils/validation/spaceValidation');
const validation = require('../../../utils/validateRequest');
const dbService = require('../../../utils/dbService');
const models = require('../../../model');
const deleteDependentService = require('../../../utils/deleteDependent');
const utils = require('../../../utils/common');

/**
 * @description : create record of Space in SQL table.
 * @param {Object} req : request including body for creating record.
 * @param {Object} res : response of created record.
 * @return {Object} : created Space. {status, message, data}
 */ 
const addSpace = async (req, res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let validateRequest = validation.validateParamsWithJoi(
      dataToCreate,
      spaceSchemaKey.schemaKeys);
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    } 
    dataToCreate.addedBy = req.user.id;
    delete dataToCreate['updatedBy'];
        
    let createdSpace = await dbService.createOne(Space,dataToCreate);
    return  res.success({ data :createdSpace });
  } catch (error) {
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : create multiple records of Space in SQL table.
 * @param {Object} req : request including body for creating records.
 * @param {Object} res : response of created records.
 * @return {Object} : created Spaces. {status, message, data}
 */
const bulkInsertSpace = async (req, res)=>{
  try {
    let dataToCreate = req.body.data;   
    if (dataToCreate !== undefined && dataToCreate.length){
      dataToCreate = dataToCreate.map(item=>{
        delete item.updatedBy;
        item.addedBy = req.user.id;
              
        return item;
      });
      let createdSpace = await dbService.createMany(Space,dataToCreate); 
      return  res.success({ data :{ count :createdSpace.length || 0 } });       
    }
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find all records of Space from table based on query and options.
 * @param {Object} req : request including option and query. {query, options : {page, limit, includes}, isCountOnly}
 * @param {Object} res : response contains data found from table.
 * @return {Object} : found Space(s). {status, message, data}
 */
const findAllSpace = async (req, res) => {
  try {
    let dataToFind = req.body;
    let options = {};
    let query = {};
    let foundSpace;
    let validateRequest = validation.validateFilterWithJoi(
      dataToFind,
      spaceSchemaKey.findFilterKeys,
      Space.tableAttributes
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToFind && dataToFind.query !== undefined) {
      query = dataToFind.query;
    }
    if (dataToFind && dataToFind.isCountOnly){
      foundSpace = await dbService.count(Space, query);
      if (!foundSpace) {
        return res.recordNotFound();
      } 
      foundSpace = { totalRecords: foundSpace };
      return res.success({ data :foundSpace });
    }
    if (dataToFind && dataToFind.options !== undefined) {
      options = dataToFind.options;
    }
    foundSpace = await dbService.paginate( Space,query,options);
    if (!foundSpace){
      return res.recordNotFound();
    }
    return res.success({ data:foundSpace }); 
  }
  catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : find record of Space from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains record retrieved from table.
 * @return {Object} : found Space. {status, message, data}
 */
const getSpace = async (req, res) => {
  try { 
    let id = req.params.id;
    let foundSpace = await dbService.findOne(Space,{ id :id });
    if (!foundSpace){
      return res.recordNotFound();
    }
    return  res.success({ data :foundSpace });

  } catch (error){
    return res.internalServerError();
  }
};

/**
 * @description : returns total number of records of Space.
 * @param {Object} req : request including where object to apply filters in request body 
 * @param {Object} res : response that returns total number of records.
 * @return {Object} : number of records. {status, message, data}
 */
const getSpaceCount = async (req, res) => {
  try {
    let dataToCount = req.body;
    let where = {};
    let validateRequest = validation.validateFilterWithJoi(
      dataToCount,
      spaceSchemaKey.findFilterKeys,
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message: `${validateRequest.message}` });
    }
    if (dataToCount && dataToCount.where){
      where = dataToCount.where;
    }  
    let countedSpace = await dbService.count(Space,where);
    if (!countedSpace){
      return res.recordNotFound();
    }
    return res.success({ data :{ count :countedSpace } });

  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }
};

/**
 * @description : update record of Space with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Space.
 * @return {Object} : updated Space. {status, message, data}
 */
const updateSpace = async (req, res) => {
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
      spaceSchemaKey.schemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    query = { id:req.params.id };
    let updatedSpace = await dbService.update(Space,query,dataToUpdate);
    return  res.success({ data :updatedSpace }); 
  } catch (error){
    return res.internalServerError({ data:error.message }); 
  }    
};

/**
 * @description : update multiple records of Space with data by id.
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Spaces.
 * @return {Object} : updated Spaces. {status, message, data}
 */
const bulkUpdateSpace = async (req, res)=>{
  try {
    let filter = req.body && req.body.filter ? { ...req.body.filter } : {};
    let dataToUpdate = {};
    if (req.body && typeof req.body.data === 'object' && req.body.data !== null) {
      dataToUpdate = {
        ...req.body.data,
        updatedBy:req.user.id
      };
    }
    let updatedSpace = await dbService.update(Space,filter,dataToUpdate);
    if (!updatedSpace){
      return res.recordNotFound();
    }
    return  res.success({ data :{ count :updatedSpace.length } });
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : partially update record of Space with data by id;
 * @param {Object} req : request including id in request params and data in request body.
 * @param {Object} res : response of updated Space.
 * @return {Object} : updated Space. {status, message, data}
 */
const partialUpdateSpace = async (req, res) => {
  try {
    let dataToUpdate = { ...req.body, };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let validateRequest = validation.validateParamsWithJoi(
      dataToUpdate,
      spaceSchemaKey.updateSchemaKeys
    );
    if (!validateRequest.isValid) {
      return res.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    const query = { id:req.params.id };
    let updatedSpace = await dbService.update(Space, query, dataToUpdate);
    if (!updatedSpace) {
      return res.recordNotFound();
    }
    return res.success({ data : updatedSpace });
  } catch (error){
    return res.internalServerError({ message:error.message });
  }
};

/**
 * @description : deactivate record of Space from table by id;
 * @param {Object} req : request including id in request params.
 * @param {Object} res : response contains updated record of Space.
 * @return {Object} : deactivated Space. {status, message, data}
 */
const softDeleteSpace = async (req, res) => {
  try {
    if (!req.params || !req.params.id) {
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }              
    query = { id:req.params.id };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedSpace = await deleteDependentService.softDeleteSpace(query, updateBody);
    if (!updatedSpace){
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSpace });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : delete record of Space from table.
 * @param {Object} req : request including id as request param.
 * @param {Object} res : response contains deleted record.
 * @return {Object} : deleted Space. {status, message, data}
 */
const deleteSpace = async (req, res) => {
  try {
    let dataToDeleted = req.body;
    let query = { id:req.params.id };
    if (dataToDeleted && dataToDeleted.isWarning) {
      let countedSpace = await deleteDependentService.countSpace(query);
      if (!countedSpace){
        return res.recordNotFound();
      }
      return res.success({ data :countedSpace });
    }
    let deletedSpace = await deleteDependentService.deleteUser(query);
    if (!deletedSpace){
      return res.recordNotFound(); 
    }
    return  res.success({ data :deletedSpace });    
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }

};

/**
 * @description : delete records of Space in table by using ids.
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains no of records deleted.
 * @return {Object} : no of records deleted. {status, message, data}
 */
const deleteManySpace = async (req, res) => {
  try {
    let dataToDelete = req.body;
    let query = {};
    if (!dataToDelete || !dataToDelete.ids) {
      return res.badRequest({ message : 'Insufficient request parameters! ids field is required.' });
    }                              
    query = { id:{ $in:dataToDelete.ids } };
    if (dataToDelete.isWarning){
      let countedSpace = await deleteDependentService.countSpace(query);
      if (!countedSpace) {
        return res.recordNotFound();
      }
      return res.success({ data: countedSpace });            
    }
    let deletedSpace = await deleteDependentService.deleteSpace(query);
    if (!deletedSpace) {
      return res.recordNotFound();
    }
    return res.success({ data: deletedSpace });          
  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

/**
 * @description : deactivate multiple records of Space from table by ids;
 * @param {Object} req : request including array of ids in request body.
 * @param {Object} res : response contains updated records of Space.
 * @return {Object} : number of deactivated documents of Space. {status, message, data}
 */
const softDeleteManySpace = async (req, res) => {
  try {
    let dataToUpdate = req.body;
    let query = {};
    if (!req.params || !req.params.id){
      return res.badRequest({ message : 'Insufficient request parameters! id is required.' });
    }            
    query = { id:{ $in:dataToUpdate.ids } };
    const updateBody = {
      isDeleted: true,
      updatedBy: req.user.id
    };
    let updatedSpace = await deleteDependentService.softDeleteSpace(query, updateBody);
    if (!updatedSpace) {
      return res.recordNotFound();
    }
    return  res.success({ data :updatedSpace });

  } catch (error){
    return res.internalServerError({ message:error.message });  
  }
};

module.exports = {
  addSpace,
  bulkInsertSpace,
  findAllSpace,
  getSpace,
  getSpaceCount,
  updateSpace,
  bulkUpdateSpace,
  partialUpdateSpace,
  softDeleteSpace,
  deleteSpace,
  deleteManySpace,
  softDeleteManySpace,
};
