/**
 * transactionValidation.js
 * @description :: validate each post and put request as per transaction model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of transaction */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  prdId: joi.string().allow(null).allow(''),
  prdName: joi.string().allow(null).allow(''),
  prdValue: joi.number().integer().allow(0),
  prdImg: joi.string().allow(null).allow(''),
  prdDesc: joi.string().allow(null).allow(''),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  importDate: joi.date().options({ convert: true }).allow(null).allow(''),
  exportDate: joi.date().options({ convert: true }).allow(null).allow('')
}).unknown(true);

/** validation keys and properties of transaction for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  prdId: joi.string().allow(null).allow(''),
  prdName: joi.string().allow(null).allow(''),
  prdValue: joi.number().integer().allow(0),
  prdImg: joi.string().allow(null).allow(''),
  prdDesc: joi.string().allow(null).allow(''),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  status: joi.string().allow(null).allow(''),
  importDate: joi.date().options({ convert: true }).allow(null).allow(''),
  exportDate: joi.date().options({ convert: true }).allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of transaction for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      prdId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      prdName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      prdValue: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      prdImg: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      prdDesc: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      expiryDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      status: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      importDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      exportDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
