/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- user.js: This includes the schema for users to use in the backend. */

const mongoose = require('mongoose');

let User;

try {
    User = mongoose.model("User"); // Try to get the model if already defined
} catch (error) {
    const userSchema = new mongoose.Schema({
        firstName: { type: String },
        lastName: { type: String },
        emailCreate: { type: String, unique: true }
    });
    User = mongoose.model("User", userSchema);  // Register model only if not already defined
}

module.exports = User;