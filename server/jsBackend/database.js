const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/viewcorp";

async function main() {
    await mongoose.connect(URL);
}

main();

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});

const User = mongoose.model("User", UserSchema);

