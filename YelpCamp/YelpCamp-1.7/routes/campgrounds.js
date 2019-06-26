var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// INDEX ROUTE ---Show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Something wrong");
        }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
        }
});
});


//CREATE ROUTE --- create new campgrounds and add to db
router.post("/",function(req,res){
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
router.get("/new",function(req,res){
         res.render("campgrounds/newcampground");   
});

//SHOW --- show more info of one campground using id

router.get("/:id",function(req,res){
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

//middleware
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;