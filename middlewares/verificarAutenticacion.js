import { request, response } from 'express'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const verificarAutenticacion = async (req = request, res = response, next) => {
  let token = ''
  if (req.headers.authorization) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET)
      req.usuario = await Usuario.findOne({ _id: payload.id }).select('-password -confirmado -token -createdAt -updatedAt -__v')
      return next()
    } catch (err) {
      const error = new Error('Hubo un error en el servidor')
      return res.status(404).json({
        mensaje: error.message
      })
    }
  } else {
    const error = new Error('Token no válido')
    return res.status(401).json({
      mensaje: error.message
    })
  }
}

export default verificarAutenticacion
