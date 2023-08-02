const express = require("express");
const Category = require("../database/models/Category");
const { default: slugify } = require("slugify");
const router = express.Router();

router.get("/categories", (req,res)=>{
    res.send("Rotas de categorias.");
});

router.get("/admin/categories/new", (req,res)=>{
    res.render("admin/newCategory");
});

router.post("/categories/save",(req,res)=>{
   let title = req.body.title;

    if (title!=undefined) {

        Category.create({
            title: title,
            slug: slugify(title)
        }).then(()=>{
            res.redirect("/");
        });

    } else{
        res.render("admin/newCategory");
    }
});

module.exports = router;