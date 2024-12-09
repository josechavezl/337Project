const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    emailCreate:{type:String, unique: true}
});

userSchema.virtual("name").get(function() {
    let fullName = "";

    if (this.firstName && this.firstName) {
        fullName = `${this.firstName} ${this.lastName}`;
    }
    return fullName;
});

const User = mongoose.model("User", userSchema);
module.exports = User;