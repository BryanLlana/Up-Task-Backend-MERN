import express from 'express'

import {
  autenticar,
  comprobarToken,
  confirmarCuenta,
  olvidePassword,
  registrarUsuario
} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)

export default router
