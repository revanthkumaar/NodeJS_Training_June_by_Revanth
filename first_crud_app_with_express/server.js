const expressImport = require('express')
const serverApp = expressImport();
const bodyParser = require('body-parser')
//import the functionalities of mongo client nodejs driver 
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://revanth:revanth1994@cluster0.z9wuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('connected to database')
})
.catch(error => console.log(error))

//MongoClient.connect('string',{config}).then().catch()

serverApp.use(bodyParser.urlencoded({ extended: true }))

serverApp.get('/',function(req,res){
   res.sendFile(__dirname + '/index.html')
})

serverApp.get('/json',function(req,res){
    res.send('<h1>my first server on express</h1>')
})

serverApp.post('/userdata',function(req,res){
    console.log(req.body);
    res.send('got user info')
})


serverApp.listen(5000,function(){
    console.log('server created on port 5000')
})