const { Sequelize } = require("sequelize");

const connection = new Sequelize(
    "guiaPress",
    "root",
    "",
    {
        host: "localhost",
        dialect: "mysql",
    }
);

module.exports = connection;
