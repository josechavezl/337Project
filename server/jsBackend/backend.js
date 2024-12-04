const express = require('express');
const app = express();
const path = require('path');

const UserCollection = require("./user");
const clientPath = path.join(__dirname, '../client');

const port = 5000;
const hostname = "127.0.0.1";

app.get('/', (req, res) => {
    res.render("login");
});

app.get('/signup', (req, res) => {
    res.render("signup");
});

app.post("/signup", async (req, res) => {
    const user = await UserCollection.create({
        userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userEmail: req.body.userEmail
    });
  
    return res.status(200).json(user);
  });

app.post("./login", async(req, res) => {
    try {
        const user = await UserCollection.findOne({userEmail: req.body.userEmail});

        if (user) {  // access dashboard
            res.render("dashboard");
        }
        else {
            res.status(400).json({error: "User does not exist"})
        }
    }
    catch (error) {
        res.status(400).json({error});
    }
});

app.use(express.json());
app.use(express.static(clientPath));

app.post('/')

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
