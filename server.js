require("babel-register");
// modules
const express = require("express");

const app = express();

app.use(express.static(`${__dirname}/dist`));

// server
app.get("/*", (req, res) => {
    res.send(`${__dirname}/dist/index.html`);
});

// local error handler
app.use((err, req, res, next) => {

    err.message = err.message || "Internal server error";
    err.status = err.status || 500;
    console.log(res)
    res.status(err.status).send(err.message);

});

app.listen(1337, () => {
    console.log("Server listening at port 1337");
});
