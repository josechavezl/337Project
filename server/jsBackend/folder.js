/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- folder.js: This includes the schema for folders to use in the backend. */

const mongoose = require('mongoose');

let Folder;

try {
    Folder = mongoose.model("Folder");
} catch (error) {
    const folderSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        files: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
        date: { type: Date, default: Date.now },
        shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    });
    Folder = mongoose.model("Folder", folderSchema);
}

module.exports = Folder;