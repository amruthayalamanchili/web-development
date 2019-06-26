var express = require("express");
var app = express();
app.use(express.static("public"));
//to avoid .ejs in every render method use the following
// app.set("view engine","ejs");
//to listen to the server
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("Now serving your app ......");
});

//root element
app.get("/",function(req,res){
    res.render("garden.ejs");
});

app.get("/person/:name",function(req,res){
    var name = req.params.name;
    res.render("love.ejs",{nameVar:name});
});

app.get("/list",function(req,res){
    var post = [
        {name:"russel",character:"good"},
        {name:"baggy",character:"rude"},
        {name:"peter",character:"sloggy"},
        {name:"rajul",character:"bad"},
        ];
        res.render("list.ejs",{posts:post});
});