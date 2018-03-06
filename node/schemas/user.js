var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var _users = new Schema({ 
    email: String,
    password: String,
    created_date: Number,
    last_login_date: Number,
    last_logout_date: Number,
    last_login_ip: String,
    locked: {type:Boolean, default: false},
    sid: String,
});

exports.Users = mongoose.model('Users', _users);