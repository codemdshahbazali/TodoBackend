const { Sequelize } = require('sequelize');
const config = require('./../config');

// sequelize_database: process.env.SEQUELIZE_DATABASE,
//   sequelize_username: process.env.SEQUELIZE_USERNAME,
//   sequelize_password: process.env.SEQUELIZE_PASSWORD,
//   sequelize_host: process.env.SEQUELIZE_HOST,
//   sequelize_dialect: process.env.SEQUELIZE_DIALECT,
//   app_port: process.env.PORT,
//   SECRET: process.env.SECRET,

/**
 * Establised SQL connection with the database
 */
const sequelize = new Sequelize(
  config.sequelize_database,
  config.sequelize_username,
  config.sequelize_password,
  {
    host: config.sequelize_host,
    dialect:
      config.sequelize_dialect /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

/**
 * Authenticates the database connection
 */
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
})();

module.exports = sequelize;
