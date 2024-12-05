const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const UserCollection = require("./user");
const clientPath = path.join(__dirname, '../../client/');

app.use(express.static(clientPath));

const port = 5000;
const hostname = "127.0.0.1";

app.get('/login', (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles\\login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(clientPath, 'htmlFiles\\signup.html'));
    console.log("SIGNUP!");
});

app.post("/signup", async (req, res) => {
    console.log(req.body);
    try {
        const user = await UserCollection.create({
            userFirstName: req.body.userFirstName,
            userLastName: req.body.userLastName,
            userEmail: req.body.userEmail
        });
        return res.status(200).json(user);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({error: error.message});
    }
});

app.post("/login", async(req, res) => {
    try {
        const user = await UserCollection.findOne({userEmail: req.body.userEmail});

        if (user) {  // access dashboard
            res.sendFile(path.join(clientPath, 'htmlFiles\\mainDash.html'));
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
