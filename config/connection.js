<<<<<<< HEAD
require('dotenv').config();

const Sequelize = require('sequelize');

=======
const Sequelize = require('sequelize');

require('dotenv').config();

// create connection to our db
>>>>>>> routes
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
      host: 'localhost',
      dialect: 'mysql',
<<<<<<< HEAD
      dialectOptions: {
        decimalNumbers: true,
      },
    });

module.exports = sequelize;
=======
      port: 3306
    });

module.exports = sequelize;
>>>>>>> routes
