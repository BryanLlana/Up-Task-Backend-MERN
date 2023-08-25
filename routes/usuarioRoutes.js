import express from 'express'

import {
  autenticar,
  comprobarToken,
  confirmarCuenta,
  modificarPassword,
  olvidePassword,
  perfil,
  registrarUsuario
} from '../controllers/usuarioControllers.js'
import verificarAutenticacion from '../middlewares/verificarAutenticacion.js'

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmarCuenta)
router.post('/olvide-password', olvidePassword)
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', modificarPassword)

router.get('/perfil', verificarAutenticacion, perfil)

export default router
