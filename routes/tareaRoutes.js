import express from 'express'

import {
  nuevaTarea,
  obtenerTarea
} from '../controllers/tareaControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevaTarea)
router.get('/:id', verificarAutenticacion, obtenerTarea)

export default router
