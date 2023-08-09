const Sequelize = require("sequelize");
const connection = require("../connection");
const Category = require("./Category");

const Article = connection.define("articles", {  
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false 
    }
});

Category.hasMany(Article);
Article.belongsTo(Category);

connection.sync();

module.exports = Article;