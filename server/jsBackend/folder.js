const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/viewcorp";

async function main() {
    await mongoose.connect(URL);
}

main();

const FolderSchema = new mongoose.Schema({
    folderName: {
        type: String,
        require: true
    },
    folderAuthor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
        require: true
    },
    folderFilesNumber: {
        type: Number,
        require: true
    },
    folderFiles: {
        type: Array,
        require: true,
        files: [String]
    },
    folderDate: {
        type: Date,
        require: true,
        default: Date.now()
    }
});

const Folder = mongoose.model("Folder", FolderSchema);
