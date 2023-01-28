/**
 * space.js
 * @description :: sequelize model of database table space
 */

const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConnection');
const sequelizePaginate = require('sequelize-paginate');
const sequelizeTransforms = require('sequelize-transforms');
const { convertObjectToEnum } = require('../utils/common');
let Space = sequelize.define('space',{
  id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true,
    unique:true
  },
  isDeleted:{ type:DataTypes.BOOLEAN },
  isActive:{ type:DataTypes.BOOLEAN },
  createdAt:{ type:DataTypes.DATE },
  updatedAt:{ type:DataTypes.DATE },
  addedBy:{ type:DataTypes.INTEGER },
  updatedBy:{ type:DataTypes.INTEGER },
  zone:{ type:DataTypes.STRING },
  block:{ type:DataTypes.STRING },
  rack:{ type:DataTypes.STRING }
}
,{
  hooks:{
    beforeCreate: [
      async function (space,options){
        space.isActive = true;
        space.isDeleted = false;

      },
    ],
    beforeBulkCreate: [
      async function (space,options){
        if (space !== undefined && space.length) { 
          for (let index = 0; index < space.length; index++) { 
        
            const element = space[index]; 
            element.isActive = true; 
            element.isDeleted = false; 
  
          } 
        }
      },
    ],
  }
}
);
Space.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());
  return values;
};
sequelizeTransforms(Space);
sequelizePaginate.paginate(Space);
module.exports = Space;
