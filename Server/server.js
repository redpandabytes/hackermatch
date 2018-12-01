var express = require('express');
const router = express.Router();
const app = express();
var fs = require('fs');

app.set('view engine', 'pug');
// static stuffs
app.use(express.static(__dirname + '/public'));



app.get("/", (req, res) => {
    res.render("index", {
        test: 'Panda'
    })
});
app.get("/new", (req, res) => {
    res.render("newCat")
});

app.get('/index', (req, res) => {
    res.render('index')
})
app.listen(8080, () => {
    console.log('http://localhost:8080')
})
app.post('/addNewCat', (req, res) => {
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString();
    })
    req.on('end', () => {
        //console.log(body);
        console.log(body);
        res.end('ok');
    });
    /*fs.readFile(__dirname + "/" + "cats.json", 'utf8', (err, data) => {
        var json = JSON.parse(data);
        //json.push(req.query)
        //fs.writeFile("results.json", JSON.stringify(json))
    })*/
});
app.post('/test', (req, res) => {
    console.log(req);
});

module.exports = router;