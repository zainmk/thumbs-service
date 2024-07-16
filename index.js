const express = require('express');
var cors = require('cors');
var { google } = require("googleapis");

const app = express();
app.use(cors());

app.get('/', (req, res) => {
    res.send("supporting service for thumbs app")
});

app.get('/auth', async(req, res) => {

    var jwtClient = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY.split(String.raw`\n`).join('\n'),
        [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/firebase.database"
        ]
    );

    jwtClient.authorize(async(error, tokens) =>  res.send(tokens.access_token));

});


app.listen(8000, () => {
    console.log(`server is running...`);
});
