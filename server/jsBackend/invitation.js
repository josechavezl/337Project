const mongoose = require('mongoose');

const invitiationSchema = new mongoose.Schema({
    invSender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    invRecipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    invFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    },
    invDate: {
        type: Date,
        default: Date.now
    }
});

const Invitation = mongoose.model("User", userSchema);
module.exports = Invitation;