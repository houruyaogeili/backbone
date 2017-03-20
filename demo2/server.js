var express = require('express');
var bodyParser = require('body-parser');
var Router = require('router');
var path = require('path');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'dist')));
app.post("/man/", function (req, res, next) {
    console.log(req.body); // => { 'info[name]': 'henry','info[age]': '30','hobby[1]': 'sport','hobby[2]': 'coding' }
});
app.get("/woman/", function (req, res, next) {
    console.log(req.query); 
    res.send('{"name":"houru2","age":10}');
});
app.get("/books/", function (req, res, next) {
    console.log(req.body);
    res.end('[{"title":"book0"},{"title":"book1"}]'); 
})
app.listen(8088);
console.log('api runing listen in 8088');
/*
	app.use加载用于处理http请求的中间件，当一个请求来的时候，会依次被这些中间件处理

*/

// express接收这个对象
