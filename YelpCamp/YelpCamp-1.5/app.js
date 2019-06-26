var express           = require("express"),
     app              = express(),
    bodyparser        = require("body-parser"),
    passport          = require("passport"),
    localStrategy     = require("passport-local"),
    mongoose          = require("mongoose"),
    User              = require("./models/user"),
    Campground        = require("./models/campground"),
    Comment           = require("./models/comments"),
    seedDB            =  require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp-camp-5",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

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


app.get("/",function(req,res){
    res.render("landing");
});

// INDEX ROUTE ---Show all campgrounds
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Something wrong");
        }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
});
});


//CREATE ROUTE --- create new campgrounds and add to db
app.post("/campgrounds",function(req,res){
     var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var newcampground = {name:name,image:image,description:desc};
        //create new campground and save to db
        Campground.create(newcampground,function(err,campground){
    if(err){
        console.log("Something went wrong");
    }else{
        res.redirect("/campgrounds");
    }
});
                
});

//NEW -- show form to create new campground
app.get("/campgrounds/new",function(req,res){
         res.render("campgrounds/newcampground");   
});

//SHOW --- show more info of one campground using id

app.get("/campgrounds/:id",function(req,res){
    //find the campground with the provided id
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
    //render show template with that campground
    res.render("campgrounds/show",{campground:foundCampground});
        }
});
});

//===========================================================================
//Comments Routes
//===========================================================================
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});


app.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
   //lookup campground using ID
   Campground.findById(req.params.id, function(err, campground){
       if(err){
           console.log(err);
           res.redirect("/campgrounds");
       } else {
          Comment.create(req.body.comment,function(err,comment){
              if(err){
                  console.log(err);
              }else{
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
       }
   });
    
})

//=========================
//Auth Routes
//=========================

//register routes
app.get("/register",function(req,res){
    res.render("register");
});

//sign up logic
app.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/campgrounds");
        
        });
            
    });
});

//Login in routes

app.get("/login",function(req,res){
    res.render("login");
});

//handling login logic
app.post("/login",passport.authenticate("local",
    {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"
}
),function(req,res){
    
});

//logout routes
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
});

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}




app.listen(process.env.PORT,process.env.ID,function(){
    console.log("yelp camp started ...");
});