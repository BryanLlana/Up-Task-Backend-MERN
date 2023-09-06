import express from 'express'

import {
  actualizarProyecto,
  agregarColaborador,
  buscarColaborador,
  eliminarColaborador,
  eliminarProyecto,
  nuevoProyecto,
  obtenerProyecto,
  obtenerProyectos
} from '../controllers/proyectoControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevoProyecto)
router.get('/', verificarAutenticacion, obtenerProyectos)
router.get('/:id', verificarAutenticacion, obtenerProyecto)
router.put('/:id', verificarAutenticacion, actualizarProyecto)
router.delete('/:id', verificarAutenticacion, eliminarProyecto)
router.post('/colaboradores', verificarAutenticacion, buscarColaborador)
router.post('/colaboradores/:id', verificarAutenticacion, agregarColaborador)
router.post('/eliminar-colaborador/:id', verificarAutenticacion, eliminarColaborador)

export default router
