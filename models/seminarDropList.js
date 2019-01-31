module.exports = function(sequelize, Sequelize) {

  const SeminarDropList = sequelize.define('seminarDropList', {
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


  return SeminarDropList;

}
