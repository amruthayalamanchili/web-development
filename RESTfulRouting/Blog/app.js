var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    expressSanitizer = require("express-sanitizer"),
    methodOverride =require("method-override"),
    express = require("express"),
    app = express();
    
    //set up
    mongoose.connect("mongodb://localhost:27017/restful-blog-app",{useNewUrlParser:true});
    app.set("view engine","ejs");
    app.use(express.static("public"));
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(methodOverride("_method"));
    
     //Mongoose/model/config
    var blogSchema = new mongoose.Schema({
        title:String,
        image:String,
        body:String,
        created:{type:Date,default:Date.now()}
        
    });
    var Blog = mongoose.model("Blog",blogSchema);
    
    // Blog.create({
    //     title:"test blog",
    //     image:"https://www.bing.com/th?id=OIP.sPLNLZD8Uc1ethu0Aao80QHaFj&pid=Api&rs=1&p=0",
    //     body:"Hey i m creating a new blog",
    // });
    
    //RESTFUL routes
   
    app.get("/",function(req,res){
        res.redirect("/blogs")
    });
    
     //INDEX route
    app.get("/blogs",function(req,res){
        Blog.find({},function(err,blogs){
            if(err){
                console.log(err);
            }else{
                
                res.render("index",{blogs:blogs});
            }
        });
        
    });
    
    //NEW Route
    app.get("/blogs/new",function(req,res){
        res.render("new");
    })
    
    //CREATE Route
    app.post("/blogs",function(req,res){
        // req.body.blog.body = req.sanitize(req.body.blog.body);
        Blog.create(req.body.blog,function(err,newblog){
            if(err){
                res.render("new");
            }else{
                //then redirect to the index
                res.redirect("/blogs");
            }
        })
    });
    
    //SHOW Route
    app.get("/blogs/:id",function(req,res){
        Blog.findById(req.params.id,function(err,foundBlog){
            if(err){
                res.redirect("/blogs");
            }else{
                res.render("show",{blog:foundBlog});
            }
        });
    });
    
   //EDIT route
   app.get("/blogs/:id/edit",function(req,res){
       Blog.findById(req.params.id,function(err,foundBlog){
           if(err){
               res.redirect("/blogs");
           }else{
               res.render("edit",{blog:foundBlog});
           }
       });
   });
   
   //UPDATE route
   
app.put("/blogs/:id", function(req, res){
    //  req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
      if(err){
          res.redirect("/blogs");
      }  else {
          res.redirect("/blogs/" + req.params.id);
      }
   });
});
    
//DELETE Route
app.delete("/blogs/:id",function(req,res){
    //destroy blog
    Blog.findByIdAndRemove(req.params.id,function(err,removeBlog){
        if(err){
            res.redirect("/blogs");
        }else{
            //redirect somewhere
            res.redirect("/blogs");
        }
    });
});
    
    //listening to the port
    app.listen(process.env.PORT,process.env.ID,function(){
        console.log("blog started .......");
    });
    
   
    