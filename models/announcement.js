module.exports = function(sequelize, Sequelize) {

  const Announcement = sequelize.define('announcement', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    slug: {
      primaryKey: true,
      type: Sequelize.CHAR,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    featured: {
      type: Sequelize.BOOLEAN,
    },
    text: {
      type: Sequelize.TEXT,
    },
    attachments: {
      type: Sequelize.JSON,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }

  });


  return Announcement;

}
