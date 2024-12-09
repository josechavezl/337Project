const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: true
    },
    files: {
        type: Array,
        files: [String]
    },
    date: {
        type: Date,
        require: true,
        default: Date.now
    },
    shared: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"  
    }]
});

const Folder = mongoose.model("Folder", FolderSchema);
module.exports = Folder;