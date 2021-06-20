const expressImport = require('express')
const serverApp = expressImport();

serverApp.get('/',function(req,res){
   res.sendFile(__dirname + '/index.html')
})

serverApp.get('/json',function(req,res){
    res.send('<h1>my first server on express</h1>')
})

serverApp.listen(5000,function(){
    console.log('server created on port 5000')
})