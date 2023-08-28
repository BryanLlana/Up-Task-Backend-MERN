import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import usuarioRoutes from './routes/usuarioRoutes.js'
import proyectoRoutes from './routes/proyectoRoutes.js'
import tareaRoutes from './routes/tareaRoutes.js'

import conectarDB from './config/db.js'
dotenv.config()
conectarDB()

const app = express()

app.use(express.json())

//* Configurar cors
/* const whiteList = [process.env.FRONTEND_URL]
const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Error de cors'))
    }
  }
} */

app.use(cors(/* corsOption */))

//* Routing
app.use('/api/usuarios', usuarioRoutes)
app.use('/api/proyectos', proyectoRoutes)
app.use('/api/tareas', tareaRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
