var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj =require("../middleware");

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
router.post("/",middlewareObj.isLoggedIn,function(req,res){
     var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var author = {
            id:req.user._id,
            username:req.user.username
        }
        var newcampground = {name:name,image:image,description:desc,author:author};
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
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
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

//EDIT campground route

router.get("/:id/edit",middlewareObj.checkUserAuthorization,function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.render("campgrounds/edit",{campground:foundCampground});
        }
    })
    
})
//UPDATE campground route
router.put("/:id",middlewareObj.checkUserAuthorization,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Delete route
router.delete("/:id",middlewareObj.checkUserAuthorization,function(req,res){
    
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            res.redirect("/camgrounds");
        }else{
            res.redirect("/campgrounds")
        }
    });
});





module.exports = router;