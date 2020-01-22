var express = require('express')
var bodyParser = require('body-parser')

var app = express()
var http = require('http').Server(app)
app.set('view engine', 'ejs'); 


app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res, next) =>{
    res.render('index',{title:'NodeServer',name:''});
})

app.get('/data/:name', (req, res, next) =>{
    var username = req.params.name;
    res.render('index',{title:'NodeServer',name:username});
})

app.post('/',(req,res,next)=>{
    var username = req.body.name;
    console.log(username);
    res.render('index',{title:'NodeServer',name:username});
})

app.post('/data',(req,res,next)=>{
    var username =req.body.name 
    res.render('index',{title:'NodeServer',name:username});
})

app.put('/data/:name',(req,res,next)=>{
    res.json({
        name:req.params.name,
        title:req.body.title
    })
})

app.delete('/data/:name',(req,res,next)=>{
    res.json({
        msg:`${req.params.name} your entry is deleted`
    })
})
app.post('/login',(req,res,next)=>{
    if(!req.header('auth-token')){
        return res.status(401).send('Mention the auth-token');
    }
    if(req.header('auth-token')=='12345'){
        var username = req.body.name;
        res.render('index',{title:'NodeServer',name:username});
    }
    else{
        return res.send("Invalid auth-token");
    }
})


var server = http.listen(3000, function(){ 
    console.log('listining to port 3000') 
});