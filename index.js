const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req,res) => {
    fs.readdir('./files', (err,files) => {
        res.render('index', {files : files});
    })
}).listen(3000);

app.post('/create', (req,res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.details, (err) => {
        if(err) throw err;
        res.redirect('/');
    })
});

app.get('/file/:filename', (req,res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err,filedata) => {
        res.render('show', {filename : req.params.filename, filedata : filedata})
    })
})