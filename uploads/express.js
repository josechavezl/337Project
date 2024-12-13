const express = require("express");
const app  = express();
const port = 3000;
const host = "127.0.0.1";

app.get("/calculate:/operation:/num1:/num2", (req,res) => {
    console.log
});

app.post("/my_form_submission", (req,res) => res.send("Some response"));

app.listen(port,host, () =>
 console.log(`Example app listening at http://${host}:${port}`));