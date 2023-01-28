/**
 * productValidation.js
 * @description :: validate each post and put request as per product model
 */

const joi = require('joi');
const {
  options, isCountOnly, include, select 
} = require('./commonFilterValidation');

/** validation keys and properties of product */
exports.schemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  prdID: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  value: joi.number().integer().allow(0),
  img: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  importDate: joi.date().options({ convert: true }).allow(null).allow(''),
  exportDate: joi.date().options({ convert: true }).allow(null).allow(''),
  locId: joi.number().integer().allow(0)
}).unknown(true);

/** validation keys and properties of product for updation */
exports.updateSchemaKeys = joi.object({
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  prdID: joi.string().allow(null).allow(''),
  name: joi.string().allow(null).allow(''),
  value: joi.number().integer().allow(0),
  img: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  expiryDate: joi.date().options({ convert: true }).allow(null).allow(''),
  importDate: joi.date().options({ convert: true }).allow(null).allow(''),
  exportDate: joi.date().options({ convert: true }).allow(null).allow(''),
  locId: joi.number().integer().allow(0),
  id: joi.number().integer()
}).unknown(true);

let keys = ['query', 'where'];
/** validation keys and properties of product for filter documents from collection */
exports.findFilterKeys = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      prdID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      value: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      img: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      expiryDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      importDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      exportDate: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      locId: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      id: joi.any()
    }).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  include: joi.array().items(include),
  select: select
    
}).unknown(true);
