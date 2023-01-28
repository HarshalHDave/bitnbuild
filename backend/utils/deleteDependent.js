/**
 * deleteDependent.js
 * @description :: exports deleteDependent service for project.
 */

let Space = require('../model/space');
let Transaction = require('../model/transaction');
let Product = require('../model/product');
let User = require('../model/user');
let UserAuthSettings = require('../model/userAuthSettings');
let UserTokens = require('../model/userTokens');
let Role = require('../model/role');
let ProjectRoute = require('../model/projectRoute');
let RouteRole = require('../model/routeRole');
let UserRole = require('../model/userRole');
let dbService = require('.//dbService');

const deleteSpace = async (filter) =>{
  try {
    let space = await dbService.findAll(Space,filter);
    if (space && space.length){
      space = space.map((obj) => obj.id);

      const productFilter = { $or: [{ locId : { $in : space } }] };
      const productCnt = await dbService.destroy(Product,productFilter);

      let deleted  = await dbService.destroy(Space,filter);
      let response = { product :productCnt.length, };
      return response; 
    } else {
      return {  space : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteTransaction = async (filter) =>{
  try {
    let response  = await dbService.destroy(Transaction,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProduct = async (filter) =>{
  try {
    let response  = await dbService.destroy(Product,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const spaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const spaceCnt = await dbService.destroy(Space,spaceFilter);

      const transactionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const transactionCnt = await dbService.destroy(Transaction,transactionFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt = await dbService.destroy(Product,productFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt = await dbService.destroy(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt = await dbService.destroy(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt = await dbService.destroy(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(User,filter);
      let response = {
        space :spaceCnt.length,
        transaction :transactionCnt.length,
        product :productCnt.length,
        user :userCnt.length + deleted.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  user : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserAuthSettings = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserAuthSettings,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserTokens = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserTokens,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt = await dbService.destroy(UserRole,userRoleFilter);

      let deleted  = await dbService.destroy(Role,filter);
      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response; 
    } else {
      return {  role : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt = await dbService.destroy(RouteRole,routeRoleFilter);

      let deleted  = await dbService.destroy(ProjectRoute,filter);
      let response = { routeRole :routeRoleCnt.length, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }

  } catch (error){
    throw new Error(error.message);
  }
};

const deleteRouteRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(RouteRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const deleteUserRole = async (filter) =>{
  try {
    let response  = await dbService.destroy(UserRole,filter);
    return response;
  } catch (error){
    throw new Error(error.message);
  }
};

const countSpace = async (filter) =>{
  try {
    let space = await dbService.findAll(Space,filter);
    if (space && space.length){
      space = space.map((obj) => obj.id);

      const productFilter = { $or: [{ locId : { $in : space } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      let response = { product : productCnt, };
      return response; 
    } else {
      return {  space : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countTransaction = async (filter) =>{
  try {
    const transactionCnt =  await dbService.count(Transaction,filter);
    return { transaction : transactionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countProduct = async (filter) =>{
  try {
    const productCnt =  await dbService.count(Product,filter);
    return { product : productCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUser = async (filter) =>{
  try {
    let user = await dbService.findAll(User,filter);
    if (user && user.length){
      user = user.map((obj) => obj.id);

      const spaceFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const spaceCnt =  await dbService.count(Space,spaceFilter);

      const transactionFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const transactionCnt =  await dbService.count(Transaction,transactionFilter);

      const productFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const productCnt =  await dbService.count(Product,productFilter);

      const userFilter = { $or: [{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userCnt =  await dbService.count(User,userFilter);

      const userAuthSettingsFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,userAuthSettingsFilter);

      const userTokensFilter = { $or: [{ userId : { $in : user } },{ addedBy : { $in : user } },{ updatedBy : { $in : user } }] };
      const userTokensCnt =  await dbService.count(UserTokens,userTokensFilter);

      const userRoleFilter = { $or: [{ userId : { $in : user } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        space : spaceCnt,
        transaction : transactionCnt,
        product : productCnt,
        user : userCnt,
        userAuthSettings : userAuthSettingsCnt,
        userTokens : userTokensCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserAuthSettings = async (filter) =>{
  try {
    const userAuthSettingsCnt =  await dbService.count(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserTokens = async (filter) =>{
  try {
    const userTokensCnt =  await dbService.count(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countRole = async (filter) =>{
  try {
    let role = await dbService.findAll(Role,filter);
    if (role && role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      const userRoleFilter = { $or: [{ roleId : { $in : role } }] };
      const userRoleCnt =  await dbService.count(UserRole,userRoleFilter);

      let response = {
        routeRole : routeRoleCnt,
        userRole : userRoleCnt,
      };
      return response; 
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countProjectRoute = async (filter) =>{
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter);
    if (projectroute && projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { $or: [{ routeId : { $in : projectroute } }] };
      const routeRoleCnt =  await dbService.count(RouteRole,routeRoleFilter);

      let response = { routeRole : routeRoleCnt, };
      return response; 
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const countRouteRole = async (filter) =>{
  try {
    const routeRoleCnt =  await dbService.count(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const countUserRole = async (filter) =>{
  try {
    const userRoleCnt =  await dbService.count(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteSpace = async (filter,updateBody) =>{  
  try {
    let space = await dbService.findAll(Space,filter, { id:1 });
    if (space.length){
      space = space.map((obj) => obj.id);

      const productFilter = { '$or': [{ locId : { '$in' : space } }] };
      const productCnt = await dbService.update(Product,productFilter,updateBody);
      let updated = await dbService.update(Space,filter,updateBody);

      let response = { product :productCnt.length, };
      return response;
    } else {
      return {  space : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteTransaction = async (filter,updateBody) =>{  
  try {
    const transactionCnt =  await dbService.update(Transaction,filter);
    return { transaction : transactionCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProduct = async (filter,updateBody) =>{  
  try {
    const productCnt =  await dbService.update(Product,filter);
    return { product : productCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUser = async (filter,updateBody) =>{  
  try {
    let user = await dbService.findAll(User,filter, { id:1 });
    if (user.length){
      user = user.map((obj) => obj.id);

      const spaceFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const spaceCnt = await dbService.update(Space,spaceFilter,updateBody);

      const transactionFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const transactionCnt = await dbService.update(Transaction,transactionFilter,updateBody);

      const productFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const productCnt = await dbService.update(Product,productFilter,updateBody);

      const userFilter = { '$or': [{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userCnt = await dbService.update(User,userFilter,updateBody);

      const userAuthSettingsFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userAuthSettingsCnt = await dbService.update(UserAuthSettings,userAuthSettingsFilter,updateBody);

      const userTokensFilter = { '$or': [{ userId : { '$in' : user } },{ addedBy : { '$in' : user } },{ updatedBy : { '$in' : user } }] };
      const userTokensCnt = await dbService.update(UserTokens,userTokensFilter,updateBody);

      const userRoleFilter = { '$or': [{ userId : { '$in' : user } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(User,filter,updateBody);

      let response = {
        space :spaceCnt.length,
        transaction :transactionCnt.length,
        product :productCnt.length,
        user :userCnt.length + updated.length,
        userAuthSettings :userAuthSettingsCnt.length,
        userTokens :userTokensCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  user : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserAuthSettings = async (filter,updateBody) =>{  
  try {
    const userAuthSettingsCnt =  await dbService.update(UserAuthSettings,filter);
    return { userAuthSettings : userAuthSettingsCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserTokens = async (filter,updateBody) =>{  
  try {
    const userTokensCnt =  await dbService.update(UserTokens,filter);
    return { userTokens : userTokensCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRole = async (filter,updateBody) =>{  
  try {
    let role = await dbService.findAll(Role,filter, { id:1 });
    if (role.length){
      role = role.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);

      const userRoleFilter = { '$or': [{ roleId : { '$in' : role } }] };
      const userRoleCnt = await dbService.update(UserRole,userRoleFilter,updateBody);
      let updated = await dbService.update(Role,filter,updateBody);

      let response = {
        routeRole :routeRoleCnt.length,
        userRole :userRoleCnt.length,
      };
      return response;
    } else {
      return {  role : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteProjectRoute = async (filter,updateBody) =>{  
  try {
    let projectroute = await dbService.findAll(ProjectRoute,filter, { id:1 });
    if (projectroute.length){
      projectroute = projectroute.map((obj) => obj.id);

      const routeRoleFilter = { '$or': [{ routeId : { '$in' : projectroute } }] };
      const routeRoleCnt = await dbService.update(RouteRole,routeRoleFilter,updateBody);
      let updated = await dbService.update(ProjectRoute,filter,updateBody);

      let response = { routeRole :routeRoleCnt.length, };
      return response;
    } else {
      return {  projectroute : 0 };
    }
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteRouteRole = async (filter,updateBody) =>{  
  try {
    const routeRoleCnt =  await dbService.update(RouteRole,filter);
    return { routeRole : routeRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

const softDeleteUserRole = async (filter,updateBody) =>{  
  try {
    const userRoleCnt =  await dbService.update(UserRole,filter);
    return { userRole : userRoleCnt };
  } catch (error){
    throw new Error(error.message);
  }
};

module.exports = {
  deleteSpace,
  deleteTransaction,
  deleteProduct,
  deleteUser,
  deleteUserAuthSettings,
  deleteUserTokens,
  deleteRole,
  deleteProjectRoute,
  deleteRouteRole,
  deleteUserRole,
  countSpace,
  countTransaction,
  countProduct,
  countUser,
  countUserAuthSettings,
  countUserTokens,
  countRole,
  countProjectRoute,
  countRouteRole,
  countUserRole,
  softDeleteSpace,
  softDeleteTransaction,
  softDeleteProduct,
  softDeleteUser,
  softDeleteUserAuthSettings,
  softDeleteUserTokens,
  softDeleteRole,
  softDeleteProjectRoute,
  softDeleteRouteRole,
  softDeleteUserRole,
};
