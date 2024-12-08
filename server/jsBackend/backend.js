const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Users = require('./user.js'); 
const { Console } = require('console');


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
    console.log("email:", emailLogin);

    try {
        const user = await Users.findOne({emailCreate: emailLogin});
        console.log("EMAILL", emailLogin);

        if (!user) {  // access dashboard
            console.log("AYO");
            return res.status(400).json({error: "Email does notexist ."});
        }
        else {
            console.log("EMAIL EXISSRS");
            res.sendFile(path.join(clientPath, 'htmlFiles', 'mainDash.html'));
        }
    }
    catch (error) {
        res.status(400).json({error: "ayooooo"});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
