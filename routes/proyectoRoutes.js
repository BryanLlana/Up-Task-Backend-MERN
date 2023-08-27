import express from 'express'

import {
  nuevoProyecto
} from '../controllers/proyectoControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevoProyecto)

export default router
