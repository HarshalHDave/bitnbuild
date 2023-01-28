/**
 * product.js
 * @description :: sequelize model of database table product
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Product = sequelize.define('product',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  prdID:{ type:DataTypes.STRING },
  name:{ type:DataTypes.STRING },
  value:{ type:DataTypes.INTEGER },
  img:{ type:DataTypes.STRING },
  description:{ type:DataTypes.STRING },
  expiryDate:{ type:DataTypes.DATE },
  importDate:{ type:DataTypes.DATE },
  exportDate:{ type:DataTypes.DATE },
  locId:{ type:DataTypes.INTEGER }
}
,{
  hooks:{
    beforeCreate: [
      async function (product,options){
        product.isActive = true;
        product.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (product,options){
        if (product !== undefined && product.length) { 
          for (let index = 0; index < product.length; index++) { 
        
            const element = product[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Product.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Product);
sequelizePaginate.paginate(Product);
module.exports = Product;
