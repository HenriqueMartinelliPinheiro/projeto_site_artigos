    const express = require("express");
    const router = express.Router();
    const Category = require("../database/models/Category");
    const Article = require("../database/models/Article");
    const { default: slugify } = require("slugify");
    const { json } = require("body-parser");

    router.get("/admin/articles", (req,res)=>{
        Article.findAll({
            include: [{model:Category}],
        }).then(articles=>{
            Category.findAll().then((categories)=>{
                res.render("admin/article/index", {articles: articles, categories:categories});
            });
        });
    });

    router.get("/user/article/read/:slug",(req,res)=>{
        let slug = req.params.slug;
        Article.findOne({
            where: {slug:slug}
        }).then(article=>{
            if (article != undefined) {
                Category.findAll().then((categories)=>{
                    res.render("user/article/readArticle", {article:article, categories:categories});
                });
                } else{
                res.redirect("/user/articles");
            }
        }).catch((error)=>{
            res.redirect("/user/articles");
        })
    });

    router.get("/user/articles", (req,res)=>{
        res.redirect("/user/articles/page/1");
    });  

    router.get("/admin/articles/new", (req,res)=>{
        Category.findAll({
            order: [['title', 'ASC'],],
        }).then((categories )=>{
            res.render("admin/article/newArticle",{categories: categories});
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
            res.redirect("/admin/articles");
        }).catch((error)=>{
            res.redirect("/admin/articles/new")
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
                res.redirect("/admin/articles");
            }).catch((error)=>{
                res.redirect("/admin/articles");
            });
        } else{
            res.redirect("/admin/articles");
        }
    });

    router.post("/admin/articles/edit", (req,res)=>{
        let id = req.body.id;
        Article.findByPk(id).then((article)=>{
            if(article!=undefined){
                Category.findAll().then((categories)=>{
                    res.render("admin/article/editArticle",{article:article, categories:categories});
                }).catch((error)=>{
                    res.redirect("/admin/articles");
                });
            }
        }).catch((error)=>{
            res.redirect("/admin/articles");
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
            res.redirect("/admin/articles")    
        }).catch((error)=>{
            console.log(error);
            res.redirect("/admin/articles");
        });
    });

    router.get("/user/category/:slug",(req,res)=>{
        let slug = req.params.slug;
        Category.findOne({
            where: {
                slug:slug
            },
            include: [{model: Article}]
        }).then((category)=>{
            if (category!=undefined) {
                Category.findAll().then((categories)=>{
                    res.render("user/article/index",{articles:category.articles, categories:categories});
                });
            } else {
                res.redirect("user/articles");
            }
        }).catch((error)=>{
            res.redirect("/user/articles");
        });
    });

    router.get("/user/articles/page/:num",(req,res)=>{
        let page = req.params.num;
        let offset=0;
        if (isNaN(page || page==1)) {
            page =1;
        } else{
            offset = (parseInt(page) - 1) * 5;
        }

        Article.findAndCountAll({
            order: [['id', 'DESC'],],
            limit: 5,
            offset:offset
        }).then(articles=>{
            let next;

            if (offset+5>articles.count) {
                next = false;
            } else{
                next = true;
            }

            let result = {
            articles: articles,
            next: next,
            page: parseInt(page)
            };

            Category.findAll().then((categories)=>{
                res.render("user/article/index", {result:result, categories:categories});
            })
        })
    });

    module.exports = router;