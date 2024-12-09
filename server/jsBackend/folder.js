const mongoose = require('mongoose');

let Folder;

try {
    Folder = mongoose.model("Folder");
} catch (error) {
    const folderSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        files: { type: Array, files: [String] },
        date: { type: Date, default: Date.now },
        shared: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
    });

    Folder = mongoose.model("Folder", folderSchema);
}

module.exports = Folder;