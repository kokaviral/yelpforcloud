var express     =   require("express");
var router      =   express.Router();
var campgrounds =   require("../models/campgrounds");
var User        =   require("../models/users");
var passport    =   require("passport");

//=============================
//AUTHENTICATION ROUTES
//=============================
router.get("/register",function(req,res){
    res.render("register.ejs")
});

router.post("/register",function(req,res){
    var newUser= new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err)
        {
            req.flash("error",err.message);
            res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to YelpCamp " + req.body.username + "!");
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login",function(req,res){
    res.render("login.ejs");
});

router.post("/login",passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Logged you out!");
    res.redirect("/campgrounds");
});

//==========================================================//
//LANDING PAGE
//==========================================================//
router.get("/",function(req,res){
    res.render("landingpage.ejs");
});


module.exports  =   router;

