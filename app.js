import express from 'express'
import dotenv from 'dotenv'

import usuarioRoutes from './routes/usuarioRoutes.js'

import conectarDB from './config/db.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
dotenv.config()
conectarDB()

const app = express()

app.use(express.json())

//* Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
