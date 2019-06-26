var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog-demo",{useNewUrlParser:true});
// console.log("mongoose connected");

var postSchema = new mongoose.Schema({
    title:String,
    content:String
});

var Post = mongoose.model("Post",postSchema);

var userSchema = new mongoose.Schema({
    name:String,
    email:String,
    post:[postSchema]
});

var User = mongoose.model("User",userSchema);



var newUser = new User({
    name:"john",
    email:"a@hotmail.com"
});

// newUser.post.push({
//     title:"How to behave good?",
//     content:"Be good,Do good,hear good"
// });

// newUser.save(function(err,user){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(user);
//     }
// });

User.findOne({name:"john"},function(err,user){
    if(err){
        console.log(err);
    }else{
        user.post.push({
             title:"noodles",
             content:"Be good,Do good,hear good"
        });
    }
    user.save(function(err,user){
        if(err){
            console.log(err);
        }else{
            console.log(user);
        }
    });
});


// var newPost = new Post({
//     title:"lilly",
//     content:"Intoxicating"
// });


// newPost.save(function(err,post){
//     if(err){
//         console.log(err);
//     }else{
//         console.log(post);
//     }
// })