var express = require("express"),
     app    = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    seedDB =  require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp-camp-3",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");
seedDB();

    


app.get("/",function(req,res){
    res.render("landing");
});

// INDEX ROUTE ---Show all campgrounds
app.get("/campgrounds",function(req,res){
    Campground.find({},function(err,allCampgrounds){
        if(err){
            console.log("Something wrong");
        }else{
        res.render("index",{campgrounds:allCampgrounds});
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
         res.render("newcampground");   
});

//SHOW --- show more info of one campground using id

app.get("/campgrounds/:id",function(req,res){
    //find the campground with the provided id
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
    //render show template with that campground
    res.render("show",{campground:foundCampground});
        }
});
});
app.listen(process.env.PORT,process.env.ID,function(){
    console.log("yelp camp started ...");
});