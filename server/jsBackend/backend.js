/* ViewCorp
- Ben Patrick Bruso
- Jose Luis Chavez
- Dipson K C 
- Jose Santiago Campa Morales
- CSC337: Web Programming
- Final Project
- backend.js: This is the mai backend script for our project.
- We used MongoDB for our database and have various get/post
- instances for different user actions. */

const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const upload = require('express-fileupload')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Users = require('./user.js');
const Folders = require('./folder.js');
const Files = require('./file.js');
const Invitations = require('./invitation.js');
const Comments = require('./comment.js');

const clientPath = path.join(__dirname, "../../client");

app.use(express.static(clientPath));
mongoose.connect('mongodb://127.0.0.1:27017/ViewCorp');

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

        // create user
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

        // information in URL: CANNOT MAKE IT SHORTER DUE TO ERROR
        res.redirect(`/mainDash?firstName=${encodeURIComponent(user.firstName)}&lastName=${encodeURIComponent(user.lastName)}&email=${encodeURIComponent(user.emailCreate)}`);

    }
    catch (error) {
        res.status(400).json({error: "ayooooo"});
    }
});


app.get("/mainDash", (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles', 'mainDash.html'));
});

// User button
app.post("/show-user", async (req, res) => {
    const {emailLogin} = req.body;

    try {
        const user = await Users.findOne({emailCreate: emailLogin});

        if (!user) {
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

// Folder Functionality
app.post('/create-folder', async (req, res) => {
    const {name, email, files, shared} = req.body;
    const user = await Users.findOne({ emailCreate: email });

    // create folder
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

        // include folders invited to and created
        const allFolders = folders.concat(foldersInv);
        
        console.log(allFolders);

        res.status(200).json(allFolders);
    }
    catch(error) {
        console.log("cannot show folders", error);
    }

});


// File Functionality
app.get('/get-files', async(req,res) => {
    const {email} = req.query;
    try {
        const user = await Users.findOne({emailCreate: email});
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
    
        const folders = await Folders.find({author: user._id});
        const foldersInv = await Folders.find({shared: user._id});
        const allFiles = [];
        const allFolders = folders.concat(foldersInv);
        for (const folder of allFolders) {
            if (folder.files && folder.files.length > 0) {
              // Add the files from each folder to the allFiles array
              const populatedFolder = await Folders.findById(folder._id).populate('files');
              populatedFolder.files.forEach(file => {
                allFiles.push(file);
              });
            }
          }          
        res.status(200).json(allFiles);

    }
    catch(error) {
        console.log("cannot show files", error);
    }
} )

// Upload folder for user files.
app.use(upload())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Upload function
app.post('/upload', async (req, res) => {
    if (req.files && req.files.file) {
      const file = req.files.file;
      const filename = file.name;
      const { email, firstName, lastName, folderName } = req.body;
  
      const user = await Users.findOne({ emailCreate: email });
      const folder = await Folders.findOne({ name: folderName, author: user._id });
  
      if (!folder) {
        return res.status(404).json({ message: 'Folder not found' });
      }
  
      console.log("Uploading file:", filename);
      console.log("Metadata:", { email, firstName, lastName, folderName });
  
      // express-fileupload
      try {
        file.mv('./uploads/' + filename, async (err) => {
          if (err) {
            console.error("Error during file upload:", err);
            return res.status(500).json({ message: 'Error uploading file' });
          }
          console.log("File uploaded successfully:", filename);
  
          // new file
          const newFile = new Files({
            name: filename,
            author: user._id,
            folder: folder._id,
            path: './uploads/' + filename, 
          });
            await newFile.save();
  
          folder.files.push(newFile);  
          await folder.save();
          res.json({
            message: 'File uploaded successfully',
            filename: filename,
            email,
            firstName,
            lastName
          });
        });
      } catch (error) {
        console.error('Error during file upload:', error);
        res.status(500).json({ message: 'Error uploading file' });
      }
    } else {
      res.status(400).json({ message: 'No file uploaded' });
    }
  });
  

// Invitation functionality
app.post('/invite', async (req,res) => {
    const {sender, recipient, folder} = req.body;
    const user = await Users.findOne({ emailCreate: sender });
    const user2 = await Users.findOne({emailCreate: recipient});
    const flder = await Folders.findOne({name: folder});

    // new invitation
    try {
        const newInvitation = new Invitations({
            sender: user._id,
            recipient: user2._id,
            folder: flder._id
        });
        console.log(newInvitation);
        await newInvitation.save();

        // add shared users
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


app.get('/get-comments', async (req,res) => {
    const {fileName} = req.query;
    try {
        const file = await Files.findOne({name: fileName});
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }
        const comments = await Comments.find({file: file._id}).populate('author', 'emailCreate');
        console.log("comments:", comments);

        res.status(200).json(comments);
    }

    catch (error) {
        console.log("error loading comments", error);
    }
});



app.post('/comment', async (req,res) => {
    const {comment, email, fileName, rating} = req.body;
    console.log(req.body);

    if (!comment || !email || !fileName || !rating) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

    try {
        const user = await Users.findOne({emailCreate: email});
        const file = await Files.findOne({name: fileName});

        if(!user) {
            return res.status(400).json({error: "User does not exist!"});
        }

        if (!file) {
            return res.status(400).json({ error: `${fileName} not found!` });
        }

        const newComment = new Comments({
            comment,
            author: user._id,
            file: file._id,
            rating
        });
        console.log("saved", newComment);
        await newComment.save();


        res.status(201).json(newComment);
    }


    catch (error) {
        console.log("error creating comment", error);
    }
});
  

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


  