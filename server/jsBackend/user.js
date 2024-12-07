const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    emailCreate:{type:String}
});

const Users = mongoose.model("User", userSchema);
module.exports = Users;