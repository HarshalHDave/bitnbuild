/**
 * transaction.js
 * @description :: sequelize model of database table transaction
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Transaction = sequelize.define('transaction',{
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
  prdId:{ type:DataTypes.STRING },
  prdName:{ type:DataTypes.STRING },
  prdValue:{ type:DataTypes.INTEGER },
  prdImg:{ type:DataTypes.STRING },
  prdDesc:{ type:DataTypes.STRING },
  expiryDate:{ type:DataTypes.DATE },
  status:{ type:DataTypes.STRING },
  importDate:{ type:DataTypes.DATE },
  exportDate:{ type:DataTypes.DATE }
}
,{
  hooks:{
    beforeCreate: [
      async function (transaction,options){
        transaction.isActive = true;
        transaction.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (transaction,options){
        if (transaction !== undefined && transaction.length) { 
          for (let index = 0; index < transaction.length; index++) { 
        
            const element = transaction[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Transaction.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Transaction);
sequelizePaginate.paginate(Transaction);
module.exports = Transaction;
