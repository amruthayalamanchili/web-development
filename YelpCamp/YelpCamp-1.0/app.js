var express = require("express");
var app = express();
var bodyparser = require("body-parser");
//var request = require("request");
app.use(bodyparser.urlencoded({extended : true}));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("landing");
})
var campgrounds = [
        {name : "Salmon Creek",image : "http://farm8.staticflickr.com/7016/6832014531_7b8956639a_z.jpg"},
        {name :"Granite Hill",image :"https://c2.staticflickr.com/2/1307/701472492_7d7a1fa883_b.jpg"},
        {name : "Mountain Goat's Rest",image : "https://images.fineartamerica.com/images-medium-large/at-rest-on-the-tundra-stephen-johnson.jpg"}
        ];

app.get("/campgrounds",function(req,res){
        res.render("camps",{campgrounds:campgrounds});
});



app.post("/campgrounds",function(req,res){
     var name = req.body.name;
        var image = req.body.image;
        var newcampground = {name:name,image:image};
        campgrounds.push(newcampground);
        res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){
       res.render("newcampground");
});
app.listen(process.env.PORT,process.env.ID,function(){
    console.log("yelp camp started ...");
});