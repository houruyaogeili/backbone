var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var router = express.Router();

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'dist')); //告诉Express在views目录下搜索所有模板
app.engine('.html', require('ejs').__express);
app.set('view engine', 'html'); //表示在模板上应用htmly引擎，在controller中使用res.render(viewName,viewModel)方法来渲染视图
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/', router);
router.get("/",function(req,res){
  res.render("index1");
});
router.get("/model",function(req,res){
  res.render("model");
});
router.get("/model2",function(req,res){
  res.render("model2");
});
router.get("/model3",function(req,res){
  res.render("model3");
});
router.get("/collection",function(req,res){
  res.render("collection");
});
router.get("/collection2",function(req,res){
  res.render("collection2");
});
router.get("/router",function(req,res){
  res.render("Router");
});
router.get("/router2",function(req,res){
  res.render("Router2");
});
router.get("/router3",function(req,res){
  res.render("Router3");
});
router.get("/view",function(req,res){
  res.render("view");
});
router.get("/view2",function(req,res){
  res.render("view2");
});
router.get("/view3",function(req,res){
  res.render("view3");
});
app.post("/man/", function (req, res, next) {
    console.log(req.body); // => { 'info[name]': 'henry','info[age]': '30','hobby[1]': 'sport','hobby[2]': 'coding' }
    res.send(req.body);
});
app.get("/woman/", function (req, res, next) {
    console.log(req.query); 
    res.send('{"name1":"houru2","age":10}');
});
app.get("/books/", function (req, res, next) {
    console.log(req.body);
    res.end('[{"title":"houru1"},{"title":"houru2"},{"title":"houru3"},{"title":"houru4"}]'); 
});
app.post("/books/", function (req, res, next) {
    console.log(req.body);
    res.end(); 
});
app.listen(8088);
console.log('api runing listen in 8088');
/*
	app.use加载用于处理http请求的中间件，当一个请求来的时候，会依次被这些中间件处理

*/

// express接收这个对象
