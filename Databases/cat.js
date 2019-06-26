var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat-app");

var catSchema = new mongoose.Schema({
    name:String,
    age:Number,
    temperment:String
});

var Cat = mongoose.model("cat",catSchema);
//adding new cat to the db

// var george = new Cat({
//     name:"silly",
//     age:12,
//     temperment:"cool"
// });
// george.save(function(err,cats){
//     if(err){
//         console.log("something went wrong");
//     }else{
//         console.log("data saved");
//         console.log(cats);
//     }
// });
Cat.create({
    name:"solly",
    age:2,
    temperment:"bland"
},function(err,cat){
    if(err){
        console.log("OH NO SOMETHING WENT WRONG");
    }else{
        console.log("cat data created");
        console.log(cat);
    }
})
//retrieve all cats from db and console.log each one
Cat.find({},function(err,cats){
    if(err){
        console.log("data not found");
    }else{
        console.log("Cats data ...")
        console.log(cats);
    }
    
})
