const express = require("express");
const router = express.Router();
const Category = require("../database/models/Category");
const Article = require("../database/models/Article");
const { default: slugify } = require("slugify");

router.get("/user/articles", (req,res)=>{
    Article.findAll({
        include: [{model:Category}],
    }).then(articles=>{
        res.render("user/article/index", {articles: articles});
    });
});

router.get("/user/articles/new", (req,res)=>{
    Category.findAll({
        order: [['title', 'ASC'],],
    }).then((categories )=>{
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
        res.redirect("/user/articles");
    }).catch((error)=>{
        res.redirect("/user/articles/new")
    })
});

router.post("/articles/delete", (req,res)=>{
    let id = req.body.id;

    if(id!=undefined){
        Article.destroy({
            where: {
                id: id
            }
        }).then(()=>{
            res.redirect("/user/articles");
        }).catch((error)=>{
            res.redirect("/user/articles");
        });
    } else{
        res.redirect("/user/articles");
    }
});

router.post("/user/articles/edit", (req,res)=>{
    let id = req.body.id;
     Article.findByPk(id).then((article)=>{
        if(article!=undefined){
            Category.findAll().then((categories)=>{
                res.render("user/article/editArticle",{article:article, categories:categories});
            }).catch((error)=>{
                res.redirect("/user/articles");
            });
        }
    }).catch((error)=>{
        res.redirect("/user/articles");
    })
});

router.post("/articles/update", (req,res)=>{
    let title = req.body.title;
    let id = req.body.id;
    let categoryId = req.body.categoryId;
    let body = req.body.body;
    let slug = slugify(title);

    Article.update({
        title:title,
        slug: slug,
        categoryId :categoryId,
        body: body,
    }, {where: {id:id,}

    }).then(()=>{
        res.redirect("/user/articles")    
    }).catch((error)=>{
        console.log(error);
        res.redirect("/user/articles");
    });
});

module.exports = router;