const expressImport = require('express')
const serverApp = expressImport();
const bodyParser = require('body-parser')
//import the functionalities of mongo client nodejs driver 
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://revanth:revanth1994@cluster0.z9wuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('connected to database');
 

    //CREATE DATA - C
    serverApp.post('/userdata',function(req,res){
        console.log('inside /userdata call');
        const db = client.db('crud_database');
        const userCollection = db.collection('users')
        console.log(req.body)
        userCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    
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




serverApp.listen(5000,function(){
    console.log('server created on port 5000')
})