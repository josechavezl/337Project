const mongoose = require('mongoose');

let Invitation;

try {
    Invitation = mongoose.model("Folder");
} catch (error) {
    const invitationSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        files: { type: Array, files: [String] },
        date: { type: Date, default: Date.now },
        shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    });

    Invitation = mongoose.model("Folder", invitationSchema);
}

module.exports = Invitation;
