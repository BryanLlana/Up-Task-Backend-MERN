import express from 'express'

import {
  nuevoProyecto,
  obtenerProyecto,
  obtenerProyectos
} from '../controllers/proyectoControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevoProyecto)
router.get('/', verificarAutenticacion, obtenerProyectos)
router.get('/:id', verificarAutenticacion, obtenerProyecto)

export default router
