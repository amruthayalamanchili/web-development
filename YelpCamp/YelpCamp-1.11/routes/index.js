var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/",function(req,res){
    res.render("landing");
});




//=========================
//Auth Routes
//=========================

//register routes
router.get("/register",function(req,res){
    res.render("register" ,{page:'register'});
});

//sign up logic
router.post("/register",function(req,res){
    var newUser = new User({username:req.body.username});
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            req.flash("error", err.message);
            // console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelp camp " + user.username);
            res.redirect("/campgrounds");
        
        });
            
    });
});

//Login in routes

router.get("/login",function(req,res){
    res.render("login" , {page : 'login'});
});

//handling login logic  
router.post("/login",passport.authenticate("local",
    {
    successRedirect:"/campgrounds",
    failureRedirect:"/login"    
}
),function(req,res){
    
});

//logout routes
router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","logged out.Thank you!")
    res.redirect("/campgrounds");   
}); 


module.exports = router;