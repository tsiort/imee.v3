module.exports = function(sequelize, Sequelize) {

  const User = sequelize.define('user', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
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


  return User;

}