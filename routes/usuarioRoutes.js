import express from 'express'

import {
  autenticar,
  registrarUsuario
} from '../controllers/usuarioControllers.js'

const router = express.Router()

router.post('/', registrarUsuario)
router.post('/login', autenticar)

export default router
