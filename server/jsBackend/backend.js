
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const fs = require('fs');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = require('./user.js');
const Folders = require('./folder.js');
const File = require('./file.js');
const Invitations = require('./invitation.js');

const clientPath = path.join(__dirname, "../../client");

app.use(express.static(clientPath));
mongoose.connect('mongodb://127.0.0.1:27017/ViewCorp'); // DATABASE NAME, users is a collection

const port = 5000;
const hostname = "127.0.0.1";
const database = mongoose.connection;

database.once('open', ()=>{
    console.log("Mongo db connection:", database.db.databaseName);
})


// added root route
app.get('/', (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles', 'login.html'));
    console.log("ROOT");
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles', 'signup.html'));
    console.log("SIGNUP!");
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    const {firstName, lastName, emailCreate} = req.body;

    try {
        const emailUsed = await Users.findOne({emailCreate});

        if (emailUsed) {
            return res.status(400).json({error: "Email in use."});
        }

        const user = new Users({
            firstName,
            lastName,
            emailCreate
        });

        await user.save();
        console.log(user);
        res.status(200).json({message: "Form Submission Successful."});
    }
    catch(error) {

    }
});

app.post("/login", async(req, res) => {
    console.log(req.body);
    const {emailLogin} = req.body;

    try {
        const user = await Users.findOne({emailCreate: emailLogin});

        if (!user) {  // access dashboard
            return res.status(400).json({error: "Email does notexist ."});
        }

        // res.status(200).json({
        //     user: {
        //         name: user.name,  // full name (from virtual field)
        //         email: user.emailCreate  // email
        //     }
        // });
        res.redirect(`/mainDash?firstName=${encodeURIComponent(user.firstName)}&lastName=${encodeURIComponent(user.lastName)}&email=${encodeURIComponent(user.emailCreate)}`);

        
        // res.redirect("/mainDash");

    }
    catch (error) {
        res.status(400).json({error: "ayooooo"});
    }
});




app.get("/mainDash", (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles', 'mainDash.html'));
});

app.post("/show-user", async (req, res) => {
    const {emailLogin} = req.body;

    try {
        const user = await Users.findOne({emailCreate: emailLogin});

        if (!user) {  // access dashboard
            return res.status(400).json({error: "USER does notexist ."});
        }

        res.status(200).json({
            name: user.name,
            email: user.emailCreate
        });
    }
    catch (error) {

    }
});


app.post('/create-folder', async (req, res) => {
    const {name, email, files, shared} = req.body;
    const user = await Users.findOne({ emailCreate: email });
    try {
        const newFolder = new Folders({
            name,
            author: user._id,
            files: files || [],
            shared: shared || []
        });
        await newFolder.save();
        res.status(201).json(newFolder);
    }

    catch (error) {
        console.log("error creating folder", error);
    }
});

app.get('/get-folders', async (req, res) => {
    const {email} = req.query;
    try {
        const user = await Users.findOne({emailCreate: email});
        const folders = await Folders.find({author: user._id});
        res.status(200).json(folders);
    }
    catch(error) {
        console.log("cannot show folders", error);
    }

});









// new 

app.post("/upload", (req, res) => {
    const fileName = req.headers["x-file-name"]; // Get file name from headers
    const filePath = path.join(__dirname, "uploads", decodeURIComponent(fileName));

    const writeStream = fs.createWriteStream(filePath);

    req.pipe(writeStream);

    writeStream.on("finish", async () => {
        // Create a new file document in MongoDB with the file's metadata
        try {
            const newFile = new File({
                name: fileName,
                author: req.user._id, // Assuming user info is available in req.user
                folder: req.body.folderId, // Assuming the folder ID is sent in the request body
            });
            await newFile.save(); // Save the file metadata to the database

            // Optionally, add the file to a folder's file array
            if (req.body.folderId) {
                const folder = await Folders.findById(req.body.folderId);
                if (folder) {
                    folder.files.push(newFile._id); // Add the file reference to the folder
                    await folder.save();
                }
            }

            res.status(200).json({ message: "File uploaded successfully", fileName });
        } catch (error) {
            console.error("Error saving file metadata:", error);
            res.status(500).json({ error: "Error saving file metadata" });
        }
    });

    writeStream.on("error", (error) => {
        console.error("Error saving file:", error);
        res.status(500).json({ error: "File upload failed" });
    });
});









  





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


  