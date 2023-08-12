const express = require("express");
const Category = require("../database/models/Category");
const { default: slugify } = require("slugify");
const router = express.Router();

router.get("/admin/categories/new", (req,res)=>{
    res.render("admin/category/newCategory");
});

router.post("/categories/save",(req,res)=>{
   let title = req.body.title;

    if (title!=undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/admin/categories");
        });

    } else{
        res.render("/admin/categories");
    }
});

router.get("/admin/categories",(req,res)=>{
    Category.findAll().then(categories=>{
        res.render("admin/category/index", {categories: categories});
    });
});

router.post("/categories/delete",(req,res)=>{
    let id = req.body.id;
    if(id!= undefined){

            Category.destroy({
                where:{
                    id: id
                }
            }).then(()=>{
                res.redirect("/admin/categories")
            });
    } else{
        res.redirect("/admin/categories");
    }
});

router.post("/admin/categories/edit",(req,res)=>{
    let id = req.body.id;
    Category.findByPk(id).then((category)=>{
        if (category!=undefined) {
            res.render("admin/category/editCategory",{category: category});
        } else{
            res.render("/admin/categories/new");
        }
    }).catch((error)=>{
        res.render("/admin/categories");
    });
});

router.post("/categories/update",(req,res)=>{
    let id = req.body.id;
    let title = req.body.title;
    console.log(req.body.title);
    Category.update({title: title,slug: slugify(title)},{where: {id:id}})
    .then(()=>{
        res.redirect("/admin/categories");
    })
    .catch((error)=>{
        console.log(error);
        res.redirect("/admin/categories");
    });
});

module.exports = router;