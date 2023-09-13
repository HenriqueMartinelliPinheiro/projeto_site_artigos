const Sequelize = require("sequelize");
const connection = require("../connection");

const User = connection.define("users", {  
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
connection.sync({force: false});

module.exports = User;