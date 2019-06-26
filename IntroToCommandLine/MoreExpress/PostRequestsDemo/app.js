var express = require("express");
var app = express();
var bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));
//to avoid .ejs for every file while rendering use this
app.set("view engine","ejs");
var friends = ["hally","sally","bally","dally","lolly"];
//root 
app.get("/",function(req,res){
    res.render("home");
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

//"/friends list"
app.get("/friends",function(req,res){
    res.render("friends" ,{friends:friends});
});


//to listen to server
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server running ....")
});