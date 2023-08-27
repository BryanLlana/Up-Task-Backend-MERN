import express from 'express'

import {
  nuevaTarea
} from '../controllers/tareaControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', verificarAutenticacion, nuevaTarea)

export default router
