const mongoose = require('mongoose');
const URL = "mongodb://127.0.0.1/viewcorp";

async function main() {
    await mongoose.connect(URL);
}

main();

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
        ref: "File",
        require: true
    },
    fileDate: {
        type: Date,
        require: true,
        default: Date.now()
    }
});

const File = mongoose.model("File", FileSchema);
module.exports = File;
