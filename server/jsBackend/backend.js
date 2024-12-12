
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');


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
        const foldersInv = await Folders.find({shared: user._id});



        console.log(user);
        console.log(folders);
        console.log(foldersInv);

        const allFolders = folders.concat(foldersInv);
        
        console.log(allFolders);

        res.status(200).json(allFolders);
    }
    catch(error) {
        console.log("cannot show folders", error);
    }

});






// const multer = require("multer");
// const path = require("path");
// const File = require("./file.js");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "uploads"))
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });
// const upload = multer({ storage });


// app.post('/upload', upload.single('file'), async (req, res) => {
//     const { email } = req.body; 

//     try {
//         // Fetch user by email
//         const user = await Users.findOne({ emailCreate: email });

//         if (!user) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         // Create a new file entry in the database
//         const newFile = new File({
//             name: req.file.filename,
//             author: user._id,   
//         });

//         await newFile.save();

//         res.status(201).json({ success: true, file: newFile });
//     } catch (error) {
//         console.error("Error saving file metadata:", error);
//         res.status(500).json({ success: false, message: "Error saving file metadata." });
//     }
// });










app.post('/invite', async (req,res) => {
    const {sender, recipient, folder} = req.body;
    const user = await Users.findOne({ emailCreate: sender });
    const user2 = await Users.findOne({emailCreate: recipient});
    const flder = await Folders.findOne({name: folder});

    try {
        const newInvitation = new Invitations({
            sender: user._id,
            recipient: user2._id,
            folder: flder._id
        });
        console.log(newInvitation);
        await newInvitation.save();

        await Folders.updateOne(
            {_id: flder._id},
            {$addToSet: {"shared": user2._id}}
        );

        res.status(201).json(newInvitation);
    }

    catch (error) {
        console.log("error creating invitation", error);
    }
});






  





app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


  