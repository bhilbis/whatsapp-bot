const { Sequelize } = require('sequelize');

// Konfigurasi koneksi ke PostgreSQL
// const sequelize = new Sequelize('wa-api', 'intern', 'siapasangka123', {
//   host: '192.168.5.200',
//   dialect: 'postgres',
//   logging: console.log,
//   omitNull: true
// });

const sequelize = new Sequelize('wa-api', 'postgres', '123456', {
  host: '127.0.0.1',
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => { 
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
