const express = require('express')
const handlebars = require('express-handlebars')
const getUsers = require('./get-users')
const {getUser, postUser, deleteUser} = require("./baseDeDatos")

const app = express()
const PORT = process.env.PORT || 4000

// CONFIGURACIONES 
app.use('/static', express.static('public'))
app.use(express.json())
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// RUTA RAIZ
app.get('/', async (req, res) => {
    const users = await getUsers()
    res.render('index', { users });
})

// RUTA PARA FORMULARIO DE CREAR USERS
app.get('/user-create', (req, res) => { 
    res.render('crear')
 })

 // RUTA PATA FORMULARIO DE ELIMINAR USERS
app.get('/user-delete/:id', async(req, res) => { 
    const {id} = req.params
    res.render('eliminar', {id, deleteUser})
 })

// API GET
 app.get("/users", async (req, res) => {
     const respuesta = await getUser()
     return res.json(respuesta)
 })
// API POST
app.post("/users", async (req, res) => {
    const {username, email, contrasenia} = req.body
    const respuesta = await postUser(username, email, contrasenia)
    return res.status(201).json(respuesta)
})
// API DELETE
app.delete("/users/:id", async(req, res) => {
    const {id} = req.params
    const respuesta = await deleteUser(id)
    if(respuesta.length === 0){
        return res.status(404).json({msg: "id not found"})
    }
    return res.json(respuesta)
})

app.listen(PORT, console.log("SERVER ON"))