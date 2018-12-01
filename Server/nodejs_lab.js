var http = require('http');
var url = require('url');
var mongoose = require('mongoose');
var express = require('express');
var fs = require('fs');

var app = express();
var port = 8080;

var Schema = mongoose.Schema;

var catSchema = new Schema({
    name: String,
    age: Number,
    hungry: Boolean
});

catSchema.methods.feed = function(a) {
    return this.model('Cat').find({hungry: this.hungry}, a);
};

var Cat = mongoose.model('Cat', catSchema);
var kitty = new Cat({
    name: 'kitty', 
    age: 3, 
    hungry: true
});

var cat = {
    "cat4": {
        "name"   : "kitty",
        "age"    : 3,
        "hungry" : true
    }
};


//app.get('/', (req, res) => res.send('Welcome'));
app.get('/hello', (req, res) => {
    res.send(`The req is ${req.url}`);
});
app.post('/addCat', (req, res) => {
    fs.readFile(__dirname + "/" + "cats.json", 'utf8', (err, data) => {
        data = JSON.parse(data);
        data["cat4"] = cat["cat4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
});
app.get('/:id', (req, res) => {
    fs.readFile(`${__dirname}/cats.json`, 'utf8', (err, data) => {
        var cats= JSON.parse(data);
        var cat = cats["cat" + req.params.id];
        if (cat) {
            console.log(cat);
            res.end(JSON.stringify(cat));
        }
        else {
            res.end("Cat not found");
        }
    });
});
app.get('/addNewCat.html', (req, res) => {

})
app.post('/addNewCat', (req, res) => {
    console.log("meow");
});

app.listen(port, () => console.log(`Listening on port ${port}`));

/*
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});

    res.write("|===|<br>");


    dog.findSimilarTypes(function(err, dogs) {
        console.log(dogs); // woof
      });

    res.end('<br><br>Bye<br>');
}).listen(8080);
*/