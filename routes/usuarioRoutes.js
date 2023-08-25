import express from 'express'

import {
  autenticar,
  confirmarCuenta,
  olvidePassword,
  registrarUsuario
} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword)

export default router
