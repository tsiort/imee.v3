module.exports = function(sequelize, Sequelize) {

  const MegaNav = sequelize.define('megaNav', {
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


  return MegaNav;

}
