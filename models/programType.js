module.exports = function(sequelize, Sequelize) {

  const ProgramType = sequelize.define('programType', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.TEXT,
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


  return ProgramType;

}
