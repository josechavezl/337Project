const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Users = require('./user.js'); 


const clientPath = path.join(__dirname, "../../client");

app.use(express.static(clientPath));
mongoose.connect('mongodb://127.0.0.1:27017/users')

const port = 5000;
const hostname = "127.0.0.1";
const db = mongoose.connection
db.once('open', ()=>{
    console.log("Mongo db connection")
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
    console.log(req.body)
    const {firstName, lastName, emailCreate} = req.body
    const user = new Users({
        firstName,
        lastName,
        emailCreate
    });

    await user.save()
    console.log(user)
    res.send("From Submission successful")    
});

app.post("/login", async(req, res) => {
    try {
        const user = await UserCollection.findOne({userEmail: req.body.userEmail});

        if (user) {  // access dashboard
            res.sendFile(path.join(clientPath, 'htmlFiles', 'mainDash.html'));
        }
        else {
            res.status(400).json({error: "User does not exist"});
        }
    }
    catch (error) {
        res.status(400).json({error});
    }
});

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
