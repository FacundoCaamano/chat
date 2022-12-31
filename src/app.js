//este tipo de exportacion es para 'type':'commonjs' que viene por defecto
const express = require('express')
const handlebars = require('express-handlebars')
const {Server}=require('socket.io')
const routerViews=require('./routes/views.router.js')

const app = express()

const httpServer= app.listen(8080, ()=>console.log('servidor corriendo..'))

const io = new Server(httpServer)

// Config engine templatess

app.engine('handlebars' , handlebars.engine())

//setear
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
app.use(express.static(__dirname + '/public'))
app.use('/', routerViews)

const messages=[]

io.on('connection' ,socket =>{
    console.log('New cliente conected')
    
    socket.on('message', data=>{
        messages.push(data)
        io.emit('logs', messages)
    })

})