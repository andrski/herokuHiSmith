const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join('dist')))
    //handle SPA
    //  any routes from all
    app.get(/.*/, (req, res)=>{
        res.sendFile(__dirname + '/dist/index.html')
    }) 
}

app.use(express.static(path.join('dist')))
//handle SPA
//  any routes from all
app.get(/.*/, (req, res)=>{
    res.sendFile(__dirname + '/dist/index.html')
}) 

async function start(){
    try{     
    app.listen(PORT, ()=>(console.log(`Server has been started on port ${PORT}`)));
    }
    catch(e){
        console.log('server Error', e.message)
        process.exit() // need be code:1
    }
}
start()