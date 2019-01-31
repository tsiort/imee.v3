module.exports = function(sequelize, Sequelize) {

  const Seminar = sequelize.define('seminar', {
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
    easyAccess: {
      type: Sequelize.BOOLEAN,
    },
    multiText: {
      type: Sequelize.BOOLEAN,
    },
    singleText: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    },
    attachments: {
      type: Sequelize.JSON,
    },
    subTitle1: {
      type: Sequelize.TEXT,
    },
    subText1: {
      type: Sequelize.TEXT,
    },
    subTitle2: {
      type: Sequelize.TEXT,
    },
    subText2: {
      type: Sequelize.TEXT,
    },
    subTitle3: {
      type: Sequelize.TEXT,
    },
    subText3: {
      type: Sequelize.TEXT,
    },
    subTitle4: {
      type: Sequelize.TEXT,
    },
    subText4: {
      type: Sequelize.TEXT,
    },
    subTitle5: {
      type: Sequelize.TEXT,
    },
    subText5: {
      type: Sequelize.TEXT,
    },
    subTitle6: {
      type: Sequelize.TEXT,
    },
    subText6: {
      type: Sequelize.TEXT,
    },
    hours: {
      type: Sequelize.TEXT,
    },
    cost: {
      type: Sequelize.TEXT,
    },
    location: {
      type: Sequelize.TEXT,
    },
    tutor: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }

  });


  return Seminar;

}
