/**
 * userValidation.js
 * @description :: validate each post and put request as per user model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

const { USER_TYPES } = require('../../constants/authConstant');
const { convertObjectToEnum } = require('../common');  
 
const authConstantDefault = require('../../constants/authConstant');    

/** validation keys and properties of user */
exports.schemaKeys = joi.object({
  email: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  companyName: joi.string().allow(null).allow(''),
  number: joi.string().allow(null).allow(''),
  address: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  country: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of user for updation */
exports.updateSchemaKeys = joi.object({
  email: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  userType: joi.valid(...convertObjectToEnum(authConstantDefault.USER_TYPES)),
  isActive: joi.boolean(),
  isDeleted: joi.boolean(),
  companyName: joi.string().allow(null).allow(''),
  number: joi.string().allow(null).allow(''),
  address: joi.string().allow(null).allow(''),
  city: joi.string().allow(null).allow(''),
  country: joi.string().allow(null).allow(''),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of user for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      companyName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      number: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      city: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      country: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
