var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog-object-demo",{useNewUrlParser:true});

var Post = require("./models/post");
var User = require("./models/user");

Post.create(
    {
    title:"cook",
    content:"fdgf gh ghg ghj jh"
}
    ,function(err,post){
    User.findOne({email:"k@gmail.com"},function(err,foundUser){
    if(err){
        console.log(err);
    }else{
        foundUser.posts.push(post);
        foundUser.save(function(err,data){
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
        });
    }
    });
});

//*******To get all post info *********
// User.findOne({email:"k@gmail.com"}).populate("posts").exec(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// }) ;   
    
//****************************************
//To create user info
// User.create({
//     name:"khan",
//     email:"k@gmail.com"
// });