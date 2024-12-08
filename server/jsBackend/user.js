const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    emailCreate:{type:String, unique: true}
});


const Users = mongoose.model("User", userSchema);
module.exports = Users;

/*UserSchema.virtual("name").get(function() {
    let userFullName = "";

    if (this.userFirstName && this.userLastName) {
        userFullName = `${this.userFirstName} ${this.userLastName}`;
    }
    return userFullName;
});*/