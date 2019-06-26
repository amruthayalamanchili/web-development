var mongoose = require("mongoose"),
    Campground = require("./models/campground"),
    Comments = require("./models/comments");
    
    var data =[
        {
             name:"Glowing Embers RV Park & Travel Centre, Edmonton, Alberta.",
             image:"https://bkamericanodyssey.files.wordpress.com/2017/04/img_2393.jpg",
             description:"At Glowing Embers RV Park & Travel Centre, we understand that vacation days come and go all too soon."
        },
         {
             name:"Catherine's Landing At Hot Springs, Hot Springs, Ark",
             image:"https://i2.wp.com/drivinvibin.com/wp-content/uploads/2017/06/6174641136_img_0904.jpg?resize=720%2C480&ssl=1",
             description:"Catherine’s Landing may be just five minutes outside of Hot Springs, but it’s truly a world away."
        },
         {
             name:"Pismo Sands RV Park, Oceano, Calif.",
             image:"http://images.goodsam.com/trailerlifedirectory/largefeatured/1000x/pho_900000938_04.jpg",
             description:"Pismo Sands RV Resort has been awarded the Best Medium Sized Park in California...." 
        },
         {
             name:"Forsyth County Shady Grove Campground.",
             image:"http://images.accesswdun.com/uploads/articles/2016/383044/shady-grove-campground_p3.jpg",
             description:"Forsyth County’s Shady Grove Campground will open for the season on Friday, March 15. Shady Grove offers 110 family-friendly campsites along Lake Lanier.."
        }
        ];
    
    function seedDB(){
        //remove all campgrounds
        Campground.deleteMany({},function(err){
        if(err){
            console.log(err);
        }
        console.log("campgrounds deleted");
        
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
            if(err){
                console.log(err);
            }else{
                console.log("campground created");
                 //add comments
                 Comments.create(
                     {
                         text:"Love the place.",
                         author:"roddy"
                     },function(err,comment){
                         if(err){
                             console.log(err);
                         }else{
                             campground.comments.push(comment);
                             campground.save();
                             console.log("created new comment");
                         }
                     })
            }
        });
        });
        
    });
    
    
   
    }
    
    
    module.exports = seedDB;