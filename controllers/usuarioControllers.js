import { request, response } from 'express'
import { check, validationResult } from 'express-validator'

import Usuario from '../models/Usuario.js'
import generarToken from '../helpers/generarToken.js'
import generarJwt from '../helpers/generarJwt.js'

const registrarUsuario = async (req = request, res = response) => {
  await check('nombre').trim().notEmpty().withMessage('El nombre no puede estar vacío').run(req)
  await check('email').trim().isEmail().withMessage('El email no es válido').run(req)
  await check('password').trim().isLength({ min: 8 }).withMessage('El password debe tener más de 8 caracteres').run(req)
  await check('password2').trim().equals(req.body.password).withMessage('Los passwords no son iguales').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  //* Validar los campos
  if (errores.length) {
    const error = new Error('Hubo errores en los campos')
    return res.status(400).json({
      mensaje: error.message,
      errores
    })
  }

  //* Evitar registros duplicados
  const { email } = req.body
  const existeUsuario = await Usuario.findOne({ email })

  if (existeUsuario) {
    const error = new Error('Usuario ya registrado')
    return res.status(400).json({
      mensaje: error.message
    })
  }

  //* Registrar usuario
  try {
    const usuario = new Usuario(req.body)
    usuario.token = generarToken()
    const usuarioAlmacenado = await usuario.save()
    return res.status(200).json({
      mensaje: 'Usuario registrado correctamente',
      usuario: usuarioAlmacenado
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

const autenticar = async (req = request, res = response) => {
  await check('email').trim().isEmail().withMessage('El email no es válido').run(req)
  await check('password').trim().notEmpty().withMessage('El password es obligatorio').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  if (errores.length) {
    const error = new Error('Hubo errores en los campos')
    return res.status(403).json({
      mensaje: error.message,
      errores
    })
  }

  const { email, password } = req.body
  //* Comprobar si usuario existe
  const usuarioObtenido = await Usuario.findOne({ email })

  if (!usuarioObtenido) {
    const error = new Error('Usuario no existe')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  //* Comprobar si cuenta esta confirmada
  if (!usuarioObtenido.confirmado) {
    const error = new Error('Cuenta no confirmada')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  //* Comprobar password
  if (!await usuarioObtenido.comprobarPassword(password)) {
    const error = new Error('Password incorrecto')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  return res.json({
    _id: usuarioObtenido._id,
    nombre: usuarioObtenido.nombre,
    email: usuarioObtenido.email,
    token: generarJwt(usuarioObtenido._id)
  })
}

export {
  registrarUsuario,
  autenticar
}
