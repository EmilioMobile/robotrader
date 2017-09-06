// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
    username: String, 
    password: String, 
    admin: Boolean,
    uuid: String,
    firstName: String,
    lastName: String,
    nickName: String,
    dateOfBirth: String,
    mail: String,
    phone: String,
}));

module.exports = mongoose.model('Location', new Schema({ 
    uuid: String,
    Country: String,    
    City: String,
    Office: String,
    Department: String,
    GPSCoordinates: String
}));