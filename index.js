// config inicial
require('dotenv').config()

const exp = require('constants')
const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()



// forma de ler JSON / middlewares
app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

//rotas da API
const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

// rota inicial / endpoint 
app.get('/', (req, res) =>{

    // mostrar req

res.json({message: 'Oi express'})

})

// entregar uma porta

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.fzz0bnq.mongodb.net/bancodaapi?retryWrites=true&w=majority`
    )
.then(()=>{
    console.log("Conectamos ao MongoDB!")
    app.listen(3000)
})
.catch((err)=> console.log(err))
