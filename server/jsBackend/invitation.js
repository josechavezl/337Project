const mongoose = require('mongoose');

let Invitation;

try {
    Invitation = mongoose.model("Invitation");
} catch (error) {
    const invitationSchema = new mongoose.Schema({
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        recipient: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        folder: {type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
        date: { type: Date, default: Date.now },
        isAccepted: { type: Boolean, default: false }
    });

    Invitation = mongoose.model("Invitation", invitationSchema);
}

module.exports = Invitation;
