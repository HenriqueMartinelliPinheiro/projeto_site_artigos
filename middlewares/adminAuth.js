function adminAuth(req,res,next) {
    if(req.session.user != undefined){
        next();
    } else{
        res.redirect("/user/articles");
    }
}

module.exports = adminAuth