import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'

const app = express()

app.use('/api/usuarios', usuarioRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
