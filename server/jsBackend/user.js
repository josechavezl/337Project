const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/ViewCorp";

async function main() {
    await mongoose.connect(URL);
}

main();

const UserSchema = new mongoose.Schema({
    userFirstName: {
        type: String,
        require: true
    },
    userLastName: {
        type: String,
        require: true
    },
    userEmail: {
        type: String,
        require: true
    }
});

UserSchema.virtual("name").get(function() {
    let userFullName = "";

    if (this.userFirstName && this.userLastName) {
        userFullName = `${this.userFirstName} ${this.userLastName}`;
    }
    return userFullName;
});



const UserCollection = new mongoose.model("User", UserSchema);

module.exports = UserCollection;