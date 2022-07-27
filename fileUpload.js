const con = require('./connection.js');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const formidable = require("formidable");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/customer/image', function(req, res) {
    var form = new formidable.IncomingForm();
    form.uploadDir = 'upload';
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);
        res.json({ fields: fields, files: files });
    });


});
app.listen(8000, () => {
    console.log("listening to port 8000");
});