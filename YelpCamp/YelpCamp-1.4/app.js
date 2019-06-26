var express = require("express"),
     app    = express(),
    bodyparser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comment = require("./models/comments"),
    seedDB =  require("./seed");

mongoose.connect("mongodb://localhost:27017/yelp-camp-3",{useNewUrlParser:true});
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
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
app.get("/campgrounds/:id/comments/new",function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});


app.post("/campgrounds/:id/comments", function(req, res){
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



app.listen(process.env.PORT,process.env.ID,function(){
    console.log("yelp camp started ...");
});