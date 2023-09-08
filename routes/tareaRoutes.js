import express from 'express'

import {
  actualizarTarea,
  cambiarEstado,
  eliminarTarea,
  nuevaTarea,
  obtenerTarea
} from '../controllers/tareaControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevaTarea)
router.get('/:id', verificarAutenticacion, obtenerTarea)
router.put('/:id', verificarAutenticacion, actualizarTarea)
router.delete('/:id', verificarAutenticacion, eliminarTarea)
router.post('/estado/:id', verificarAutenticacion, cambiarEstado)

export default router
