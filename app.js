var express         =   require("express"),
    app             =   express(),
    bodyparser      =   require("body-parser"),
    mongoose        =   require("mongoose"),
    Campgrounds     =   require("./models/campgrounds"),
    flash           =   require("connect-flash"),
    seedDb          =   require("./seeds"),
    methodo         =   require("method-override"),
    passport        =   require("passport"),
    localStrategy   =   require("passport-local"),
    User            =   require("./models/users"),
    Comment         =   require("./models/comment");

var commentRoutes       =   require("./routes/comment"),
    indexRoutes         =   require("./routes/index"),
    campgroundRoutes    =   require("./routes/campground");
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session")({
    secret:"fat guy",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(methodo("_method"));
app.use(function(req,res,next){
res.locals.currentUser=req.user;
res.locals.error  =   req.flash("error");
res.locals.success  =   req.flash("success"); 
next();
});
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(indexRoutes);


mongoose.connect("mongodb://localhost/yelpcamp",{ useNewUrlParser: true });


var port=3000 || process.env.PORT;
app.listen(port,function(){
	console.log("Server Started!!");
});
