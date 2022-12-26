let express=require('express');
let bodyParser=require('body-parser');
let config=require('./config/config');
let appDao=require('./dao/appDao');
let app=express();

let resp=function(res,data,code,next){
    res.status(code).json(data);
    return next();
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Methods','GET,POST,OPTIONS,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Authorization,Origin,Content-Type,Accept');
    res.setHeader('Acess-Control-Allow-Credentials',true);
    next();
});

app.listen(config.init_port);

console.log('Application is listening on port',config.init_port);

app.post('/category/add',function(req,res,next){
    var body=req.body;
    appDao.add_user(body,function(response,code){
        resp(res,response,code,next)
    })
});

app.get('/category/:id',function(req,res,next){
    var param=req.params;
    appDao.get_user(param,function(response,code){
        resp(res,response,code,next)
    })
});

app.put('/category/:id', function (req, res, next) {
    var id = req.params.id;
    var param = req.body;

    appDao.update_user(id, param, function (response, code) {
        resp(res, response, code, next)
    })

});
app.delete('/category/:id', function (req, res, next) {
    var param = req.params;

    appDao.delete_user(param, function (response, code) {
        resp(res, response, code, next)
    })
});


