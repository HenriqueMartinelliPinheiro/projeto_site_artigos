const bodyParser = require("body-parser");
const express = require("express");
const app =express();
const session = require("express-session");
//DB connection
const connection = require("./database/connection");

// controllers
const categoriesController = require("./controllers/categoriesController");
const articlesController = require("./controllers/articlesController");
const usersController = require("./controllers/usersController");

//models
const Article = require("./database/models/Article");
const Category = require("./database/models/Category")
const User = require("./database/models/User")

app.set("view engine", "ejs");
app.use(session({
    secret: "abc123",
    cookie: {maxAge: 30000} 
}));

//body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.use("/",categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/session", (req,res)=>{
    req.session.treinamento = "for";

});

app.get("/read",(req,ress)=>{

}); 

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