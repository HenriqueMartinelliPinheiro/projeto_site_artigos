const express = require("express");
const router = express.Router();
const Category = require("../database/models/Category");
const Article = require("../database/models/Article");
const { default: slugify } = require("slugify");

router.get("/user/articles", (req,res)=>{
    res.render("user/article/index")
});

router.get("/user/articles/new", (req,res)=>{
    Category.findAll().then((categories )=>{
        res.render("user/article/newArticle",{categories: categories});
    });
});

router.post("/articles/save",(req,res)=>{
    let categoryId = req.body.categoryId;
    let title = req.body.title;
    let body = req.body.body;

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId
    }).then(()=>{
        res.redirect("/articles");
    }).catch((error)=>{
        res.redirect("/user/articles/new")
    })
});

module.exports = router;