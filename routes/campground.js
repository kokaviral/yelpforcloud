var express =   require("express");
var router  =   express.Router();
var Campgrounds =   require("../models/campgrounds");
var middleware  =   require("../middleware");
//==========================================================//
//INDEX ROUTE : SHOWING LIST OF ALL
//==========================================================//

router.get("/campgrounds",function(req,res){
    Campgrounds.find({},function(err,allcamps){
    //Campgrounds.find({},function(error,returning data from the find function routerlied to db){
        if(err)
        {
            console.log(err);
        }else{
            res.render("index.ejs",{campgs:allcamps, currentUser:req.user});
            //                     {to be used in ejs:source array i.e. db}
        }
        
    });
});

//=================================================================//
//CREATE ROUTE : EXTRACTING DATA FROM FORMS
//================================================================//

router.post("/campgrounds",middleware.isloggedin,function(req, res){
    // get data from form and add to campgrounds array
    var name1 = req.body.name;
    var image1 = req.body.image;
    var desc=req.body.description;
    var newCampground = {name: name1, image: image1,description : desc}
    Campgrounds.create(newCampground,function(err,newlycreated){
        if(err)
        {
            req.flash("err",err.message);
            console.log(err);
        }
        else
        {
            newlycreated.author.id          =   req.user._id;
            newlycreated.author.username    =   req.user.username;
            newlycreated.save();
            //redirect back to campgrounds page
            req.flash("success","Added your Campground!")
            res.redirect("/campgrounds");
        }
    });
    

});

//=======================================================//
//NEW ROUTE : FORMS
//=======================================================//

router.get("/newcamp",middleware.isloggedin,function(req,res){
    res.render("newcamp.ejs");
});

//=======================================================//
//SHOW ROUTE : INFO ABOUT INDIVIDUALS BASED ON ID
//======================================================//

router.get("/campgrounds/:id",function(req,res){
    var reqID = req.params.id;
    Campgrounds.findById(reqID).populate("comment").exec(function(err,responsefromdb){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("showpage.ejs",{campbyid:responsefromdb});
        }
    });
});

//=======================================================//
//EDIT ROUTE 
//======================================================//
router.get("/campgrounds/:id/edit",middleware.checkowner,function(req,res){
    Campgrounds.findById(req.params.id,function(err,foundcg){
        if(err)
        {
            res.redirect("/campgrounds");
        }
        else
        {
            res.render("edit.ejs",{campground:foundcg});
        }
    })
});
router.put("/campgrounds/:id",middleware.checkowner,function(req,res){
    Campgrounds.findByIdAndUpdate(req.params.id,req.body.update,function(err,updatedcg){
        if(err)
        {
            req.flash("err",err.message);
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }      
});
});

router.delete("/campgrounds/:id",middleware.checkowner,function(req,res){
    Campgrounds.findByIdAndDelete(req.params.id,function(err,delcamp){
        if(err)
        {
            req.flash("err",err.message);            
            res.redirect("/");
        }
        else
        {
            req.flash("success","Deleted selected Campground");            
            res.redirect("/campgrounds");
        }
    });
});




module.exports  =   router;


