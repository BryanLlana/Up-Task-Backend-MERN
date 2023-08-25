import express from 'express'

import {
  autenticar,
  confirmarCuenta,
  registrarUsuario
} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmarCuenta)

export default router
