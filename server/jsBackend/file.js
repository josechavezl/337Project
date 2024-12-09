const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    fileName: {
        type: String,
        require: true
    },
    fileType: {
        type: String,
        require: true
    },
    fileAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    fileDate: {
        type: Date,
        require: true,
        default: Date.now()
    },
    fileFolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder"
    }
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
