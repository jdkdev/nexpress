// var nexpress = require('../local_modules/connect');
var nexpress = require('../local_modules/express');
var http = require('http');

var app = nexpress();

// gzip/deflate outgoing responses
// var compression = require('compression');
// app.use(compression());

// // store session state in browser cookie
// var cookieSession = require('cookie-session');
// app.use(cookieSession({
//     keys: ['secret1', 'secret2']
// }));

// parse urlencoded request bodies into req.body
var bodyParser = require('../local_modules/depends/body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// respond to all requests

app.post('/register', (req, res) => {
    console.log(req.body)
})

//create node.js http server and listen on port
http.createServer(app).listen(3000);