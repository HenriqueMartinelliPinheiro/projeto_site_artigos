const Sequelize = require("sequelize");
const connection = require("../connection");

const Category = connection.define("categories", {  
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
connection.sync({force: false});

module.exports = Category;