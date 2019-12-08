var Campgrounds =   require("../models/campgrounds");

var middleware={};

middleware.checkowner = function (req,res,next){
        if(req.isAuthenticated())
        {
            Campgrounds.findById(req.params.id,function(err,foundcamp){
                if(err)
                {
                    req.flash("error","You do not have the permission to do that!")
                    res.redirect("/campgrounds")
                }
                else
                {
                    if(foundcamp.author.id.equals(req.user._id))
                    {
                        next();
                    }
                    else
                    {
                        res.redirect("back");
                    }
                }
            });
        }
        else
        {
            res.send("NOT logged in");
        }
}

middleware.isloggedin = function isloggedin(req,res,next){
    
    if(req.isAuthenticated()){
        return next();
    }
    else
    req.flash("error", "Please Login First!");
    res.redirect("/login");
}

module.exports = middleware;