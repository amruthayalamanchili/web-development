
var express = require("express");
var router = express.Router({mergeParams:true});
var Campground = require("../models/campground");
var Comment = require("../models/comments");
var middlewareObj =require("../middleware");


//===========================================================================
//Comments Routes
//===========================================================================
router.get("/new",middlewareObj.isLoggedIn,function(req,res){
    //find campground by id
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});


router.post("/",middlewareObj.isLoggedIn, function(req, res){
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
                  //add username and id to comment
                  comment.author.id = req.user._id;
                  comment.author.username = req.user.username;
                  //save comment
                  comment.save();
                  campground.comments.push(comment);
                  campground.save();
                  res.redirect("/campgrounds/" + campground._id);
              }
          });
       }
   });
    
});

//EDIT Route

router.get("/:comment_id/edit",middlewareObj.checkCommentAuthorization,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id :req.params.id,comment:foundComment});
        }
    });
    
});

//Update comment
router.put("/:comment_id",middlewareObj.checkCommentAuthorization,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

//Deleting the comment
router.delete("/:comment_id",middlewareObj.checkCommentAuthorization,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});






module.exports = router;
