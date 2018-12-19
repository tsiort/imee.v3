module.exports = function(sequelize, Sequelize) {

  const Program = sequelize.define('program', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    slug: {
      primaryKey: true,
      type: Sequelize.CHAR,
    },
    featured: {
      type: Sequelize.BOOLEAN,
    },
    multiText: {
      type: Sequelize.BOOLEAN,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    singleText: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
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
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }

  });


  return Program;

}
