/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- invitation.js: This includes the schema for invitations to use in the backend. */

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