var express = require("express");
var app = express();
// if "/"==>hi there
app.get("/",function(req,res){
    res.send("hi there!!!!!!!");
});
//if "/bye"==>goodbye
app.get("/bye",function(req,res){
    res.send("Good Bye !!!!!!!!!!!")
});

//if"/dog"==>bowbow bow
app.get("/dog",function(req,res){
    res.send("Bow Bow Bow Bow.............");
});

//if "/dog/image"==>image
app.get("/dog/image",function(req,res){
    res.send("<img src =http://4.bp.blogspot.com/_VmZpep1KUeg/TT-ZYxvRGqI/AAAAAAAAAIA/lInvcvqOkBY/s1600/cute-puppy-dog-wallpapers.jpg width = 100px height = 100px>");
});
app.get("/b/:name",function(req,res){
    var naming = req.params.name;
    res.send("hello " + naming);
});

app.get("/b/:name/comments/:id/:title",function(req,res){
    console.log(req.params);
    res.send("Welcometo my comments page")
});

app.get("*",function(req,res){
    res.send("!*!*!*!Hello rock star!*!*!*!*")
})
//tell express to listen to the port
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("server  started");
});