const express = require('express');
const app = express();

const User = require("./user");

const port = 5000;
const hostname = "127.0.0.1";

app.get('/login', (req, res) => {
    res.render("login");
});

app.post("/login", async(req, res) => {
    try {
        const user = await User.findOne({userEmail: req.body.userEmail});

        if (user) {
            // ACCESS DASHBOARD
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

app.post('/')

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
