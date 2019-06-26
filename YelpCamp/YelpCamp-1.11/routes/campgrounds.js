var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middlewareObj =require("../middleware");
var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);

// INDEX ROUTE ---Show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Something wrong");
        }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds,page:'campgrounds'});
        }
});
});


//CREATE ROUTE --- create new campgrounds and add to db
router.post("/",middlewareObj.isLoggedIn,function(req,res){
     var name = req.body.name;
        var image = req.body.image;
        var desc = req.body.description;
        var cost = req.body.cost;
        var author = {
            id:req.user._id,
            username:req.user.username
        }
        geocoder.geocode(req.body.location, function (err, data) {
        if (err || !data.length) {
            req.flash('error', 'Invalid address');
            return res.redirect('back');
             }
        var lat = data[0].latitude;
        var lng = data[0].longitude;
        var location = data[0].formattedAddress;
        var newcampground = {name: name, image: image, description: desc,cost:cost ,author:author, location: location, lat: lat, lng: lng};
        //create new campground and save to db
        Campground.create(newcampground,function(err,campground){
    if(err){
        console.log("Something went wrong");
    }else{
        res.redirect("/campgrounds");
    }
});
                
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
    geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});
});

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