/**
 * spaceValidation.js
 * @description :: validate each post and put request as per space model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of space */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  zone: joi.string().allow(null).allow(''),
  block: joi.string().allow(null).allow(''),
  rack: joi.string().allow(null).allow('')
}).unknown(true);

/** validation keys and properties of space for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  zone: joi.string().allow(null).allow(''),
  block: joi.string().allow(null).allow(''),
  rack: joi.string().allow(null).allow(''),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of space for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      zone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      block: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      rack: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
