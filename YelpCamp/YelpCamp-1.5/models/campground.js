//create a schema for campgrounds
var mongoose = require("mongoose");
var campgroundSchema = mongoose.Schema({
    name:"String",
    image:"String",
    description:"String",
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comment"
    }]
}) ;

module.exports = mongoose.model("Campground",campgroundSchema);