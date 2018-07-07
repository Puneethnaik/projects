var mongoose = require('mongoose');
//TODO add salting to passwords

var MovieSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    title: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
});

var UserSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    }
});

var UserRatingsSchema = new mongoose.Schema({
    movieId:{
        type:String
    },
    userEmail:{
        type:String
    },
    rating:{
        type:Number
    }
});

var User = mongoose.model('User', UserSchema);
var UserRatings = mongoose.model('UserRatings', UserRatingsSchema);
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
    User:User,
    UserRatings:UserRatings,
    Movie:Movie
}