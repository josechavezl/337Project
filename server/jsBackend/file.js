const mongoose = require('mongoose');

let File;

try {
    File = mongoose.model("File");
} catch (error) {
    const fileSchema = new mongoose.Schema({
        name: { type: String, required: true, unique: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        date: { type: Date, default: Date.now },
        folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
        path: { type: String, required: true }
    });

    File = mongoose.model("File", fileSchema);
}

module.exports = File;