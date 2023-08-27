import express from 'express'

import {
  actualizarTarea,
  nuevaTarea,
  obtenerTarea
} from '../controllers/tareaControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevaTarea)
router.get('/:id', verificarAutenticacion, obtenerTarea)
router.put('/:id', verificarAutenticacion, actualizarTarea)

export default router
