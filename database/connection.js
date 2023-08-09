const { Sequelize } = require("sequelize");

const connection = new Sequelize(
    "guiaPress",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
        timezone: "-03:00"
    }
);

module.exports = connection;
