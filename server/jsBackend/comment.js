/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- comment.js: This includes the schema for comments to use in the backend. */

const mongoose = require('mongoose');

let Comment;

try {
    Comment = mongoose.model("Comment");
} catch (error) {
    const commentSchema = new mongoose.Schema({
        comment: { type: String, required: true },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        file: {type: mongoose.Schema.Types.ObjectId, ref: "File" },
        date: { type: Date, default: Date.now },
        rating: { type: Number, min: 1, max: 5, required: true }
    });
    Comment = mongoose.model("Comment", commentSchema);
}

module.exports = Comment;