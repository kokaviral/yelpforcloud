var express     =   require("express");
var router      =   express.Router();
var Campgrounds =   require("../models/campgrounds");
var Comment     =   require("../models/comment");
var middleware  =   require("../middleware");


//=======================================================//
//Comment create route
//======================================================//
router.get("/campgrounds/:id/comments/new",middleware.isloggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if(err)
        {
            req.flash("err",err.message);            
            res.redirect("/campgrounds")
        }
        else
        {
            res.render("newcomment.ejs",{campground:foundcampground});
            
        }
    });
});

router.post("/campgrounds/:id/comments",middleware.isloggedin,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcampground){
        if(err)
        {
            console.log(err);
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err)
                {
                    console.log(err);
                }
                else
                {
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();                   
                    foundcampground.comment.push(comment);
                    foundcampground.save();
                    req.flash("success","Successfully added comment!")
                    res.redirect("/campgrounds/" + foundcampground._id);
                }
                
            });
        }
    });
});


module.exports  =   router;
