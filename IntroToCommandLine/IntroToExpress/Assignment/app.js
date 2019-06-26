var express = require("express");
var app = express();

//visiting "/" print "hi there,welcome to my assignment"
app.get("/",function(req,res){
    res.send("Hi there,Welcome to my Assignment");
});

var sounds = {
    pig :"oink",
    cat :"meow",
    cow :"moo",
    rooster:"cooka doodle dooooooooo",
    dog :"woof"
}
app.get("/speak/:animal",function(req,res){
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says " + sound);
});
//visiting "/repeat/:word/:number" print word n number of times
app.get("/repeat/:word/:number",function(req,res){
    var n = Number(req.params.number);
    var name = req.params.word;
    var value = "";
    for(var i= 1;i<=n; i++){
    value += name +" ";
   
    }
    res.send(value);
});

//anything else sorry page not found
app.get("*",function(req,res){
    res.send("Sorry...Page not found")
});


//to listen to the port
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER STARTED .......");
});