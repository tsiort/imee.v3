module.exports = function(sequelize, Sequelize) {

  const Slider = sequelize.define('slider', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    title: {
      type: Sequelize.TEXT,
    },
    text: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.TEXT,
    },
    status: {
      type: Sequelize.ENUM('active', 'inactive'),
      defaultValue: 'active'
    }

  });

  // User
  //   .create({ username: 'admin', password: '$2a$04$7gWVz831i7Pwgqy7krO81OzmViWD5VBd6fVHURb8JRQoTVcYCCLI.' })
  //   .then(user => {
  //     console.log(user.get('username')); // John Doe (SENIOR ENGINEER)
  //     console.log(user.get('password')); // SENIOR ENGINEER
  //   })


  return Slider;

}
