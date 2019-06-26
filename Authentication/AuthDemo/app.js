var express                = require("express"),
    mongoose               = require("mongoose"),
    passport               = require("passport"),
    bodyParser             = require("body-parser"),
    User                   = require("./models/users"),
    localStrategy          = require("passport-local"),
    passportLocalMongoose  = require("passport-local-mongoose");
    
    
mongoose.connect("mongodb://localhost:27017/userinfo",{useNewUrlParser:true});
var app = express();
app.set("view engine","ejs");
app.use(require("express-session")({
    secret:"sriram",
    resave:false,
    saveUninitialized:false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//==================================
//Routes

app.get("/",function(req,res){
    res.render("home");
});
app.get("/secret",isLoggedIn,function(req,res){
    res.render("secret");
});


//Auth Routes

//sign up form
app.get("/register",function(req,res){
    res.render("register");
});
//handling user sign up
app.post("/register",function(req,res){
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");
        }else{
            passport.authenticate("local")(req,res,function(){  
                res.redirect("/secret");
            })
        }
    })
});

//Login Routes

//login form
app.get("/login",function(req,res){
    res.render("login");
});

//Authenticating login
//middleWare
app.post("/login",passport.authenticate("local",{
        successRedirect:"/secret",
        failureRedirect:"/login"
}),function(req,res){
    
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
});

//writing a middleware function

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}



app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server started ......")
});