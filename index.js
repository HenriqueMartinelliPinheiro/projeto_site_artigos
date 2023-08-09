const bodyParser = require("body-parser");
const express = require("express");
const app =express();

//DB connection
const connection = require("./database/connection");

// controllers
const categoriesController = require("./controllers/categoriesController");
const articlesController = require("./controllers/articlesController");

//models
const Article = require("./database/models/Article");
const Category = require("./database/models/Category")

app.set("view engine", "ejs");

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use("/",categoriesController);
app.use("/", articlesController);

connection
    .authenticate()
    .then(()=>{
        console.log("Conexão realizada com sucesso.");
    }).catch((error)=>{
        console.log(error);
    });

app.get("/", (req,res)=>{
    res.render("index");
});

app.listen(3000);