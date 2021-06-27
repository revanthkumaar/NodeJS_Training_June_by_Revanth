const expressImport = require('express')
const serverApp = expressImport();
const bodyParser = require('body-parser')
//import the functionalities of mongo client nodejs driver 
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb+srv://revanth:revanth1994@cluster0.z9wuj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

MongoClient.connect(connectionString, { useUnifiedTopology: true })
.then(client => {
    console.log('connected to database');
 

    //CREATE OPERATION
    serverApp.post('/userdata', async (req,res) => {
        console.log('inside /userdata call');
        try{
            const db = await client.db('crud_database');
            const userCollection =  await db.collection('users')
            const result = await userCollection.insertOne(req.body)
            res.json({note: 'inserted data'})
        }
        catch(error){
            console.log(error)
        }
    })

    //READ OPERATION 
    serverApp.get('/users',(req,res) => {
        const db = client.db('crud_database_one')
        db.collection('users').find({$and:[{age:"25"},{place:"bombay"}]}).toArray()
        .then(results => {
            console.log(results)
            res.json({users: results})
        })
        .catch(error => console.error(error))
    })

    //UPDATE OPERATION
    //filter people with age 25 and update their name to "roshan"

    serverApp.get('/user-update',(req,res)=> {
        //callback function
        const db = client.db('crud_database_one')
        db.collection('users').findOneAndUpdate(
            //finding a value and update it
           { age:"25" } , //filter criteria
            { //update criteria
                $set: {
                    place:"roshan"
                }
            },
            {
                upsert:true
            }
        ).then(result => res.send('updated place to'))
        .catch(error => console.error(error))
    })



})
.catch(error => console.log(error))

//MongoClient.connect('string',{config}).then().catch()



serverApp.get('/',function(req,res){
   res.sendFile(__dirname + '/index.html')
})
serverApp.get('/json',function(req,res){
    res.send('<h1>my first server on express</h1>')
})




serverApp.listen(5000,function(){
    console.log('server created on port 5000')
})