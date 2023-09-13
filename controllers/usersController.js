const express = require("express");
const router = express.Router();
const User = require("./../database/models/User");
const bcrypt = require("bcryptjs");

router.get("/admin/users", (req,res)=>{
    User.findAll()
    .then((users)=>{
        res.render("admin/users/index",{users:users});
    }).catch((error)=>{
        res.redirect("/admin/articles");
    })
});

router.get("/admin/users/create",(req,res)=>{
    res.render("admin/users/createUsers");
});

router.post("/users/delete",(req,res)=>{
    let id = req.body.id;

    if(id!=undefined && id!=NaN){
        User.destroy({where: {id:id}})
        .then(()=>{
            res.redirect("/admin/users");
        })
        .catch((error)=>{
            res.redirect("/admin/users");
        });
    } else{
        res.redirect("/admin/users");
    }
});

router.get("/admin/users/edit/:id", (req,res)=>{
    let id = req.params.id;
    if(id!=undefined && id!=NaN){
        User.findOne({where: {id:id}})
        .then((user)=>{
            res.render("admin/users/editUser", {user:user});
        }).catch((error)=>{
            res.redirect("/admin/users");
        });
    } else{
        res.redirect("/admin/users");
    }
});

router.post("/users/update",(req,res)=>{
    let email = req.body.email;
    let id = req.body.id;

    if(email!=undefined && id!=undefined){
        User.update({email:email},{where: {id:id}})
        .then(()=>{
            res.redirect("/admin/users");
        }).catch((error)=>{
            res.redirect("/admin/users");
        })
    } else{
        res.redirect("/admin/users");
    }
});

router.post("/users/create",(req,res)=>{
    let email = req.body.email;
    let password = req.body.password;

    User.findOne({where:{email:email}}).then((user)=>{
        if (user==undefined) {
            let salt = bcrypt.genSaltSync(231);
            let hash = bcrypt.hashSync(password);
            if(email!=undefined && password !=undefined){
                User.create({
                    email: email,
                    password: hash
                }).then(()=>{
                    res.redirect("/admin/articles")
                }).catch((error)=>{
                    res.redirect("/admin/articles");
                });
                
            } else{
                res.redirect("/admin/articles")
            }
        } else{
            res.redirect("/admin/users/create");
        }
    })
    .catch((error)=>{
        res.redirect("/admin/articles");
    });
});

module.exports = router;