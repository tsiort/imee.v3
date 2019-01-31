module.exports = function(sequelize, Sequelize) {

  const ProgramDropList = sequelize.define('programDropList', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    }

  });


  return ProgramDropList;

}
