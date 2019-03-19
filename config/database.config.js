// config/database.config.js

module.exports = {
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT
}
