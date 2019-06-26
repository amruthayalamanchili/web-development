var express           = require("express"),
     app              = express(),
    bodyparser        = require("body-parser"),
    passport          = require("passport"),
    localStrategy     = require("passport-local"),
    mongoose          = require("mongoose"),
    methodOverride    = require("method-override"),
    User              = require("./models/user"),
    Campground        = require("./models/campground"),
    Comment           = require("./models/comments"),
    seedDB            =  require("./seed");
 
 //Required routes   
var commentRoutes     = require("./routes/comments"),
    campgroundRoutes  = require("./routes/campgrounds"),
    indexRoutes        = require("./routes/index");
    


mongoose.connect("mongodb://localhost:27017/yelp-camp-6",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
// seedDB();

//Passport configuration
app.use(require("express-session")({
   secret:"camp",
   resave:false,
   saveUninitialized:false
   
}));
    
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(process.env.PORT,process.env.ID,function(){
    console.log("yelp camp started ...");
});