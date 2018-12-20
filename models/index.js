'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});






// Associations
db.category.belongsToMany(db.program, {
  through: 'programCategories',
});
db.program.belongsToMany(db.category, {
  through: 'programCategories',
});


db.category.belongsTo(db.programType, {
  foreignKey: 'programTypeId'
});
db.program.belongsTo(db.programType, {
  foreignKey: 'programTypeId'
});
db.megaNav.belongsTo(db.programType, {
  foreignKey: 'programTypeId'
});

db.megaNav.hasMany(db.category, {
  foreignKey: 'megaNavId'
});


db.slider.belongsTo(db.category, {
  foreignKey: 'categoryId'
});
db.slider.belongsTo(db.program, {
  foreignKey: 'programId'
});
db.slider.belongsTo(db.programType, {
  foreignKey: 'programTypeId'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
