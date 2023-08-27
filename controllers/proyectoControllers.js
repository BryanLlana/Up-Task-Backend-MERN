import { request, response } from 'express'
import { check, validationResult } from 'express-validator'

import Proyecto from '../models/Proyecto.js'

const nuevoProyecto = async (req = request, res = response) => {
  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('cliente').trim().notEmpty().withMessage('El cliente es obligatorio').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  if (errores.length) {
    const error = new Error('Hubo un error en el campo')
    return res.status(403).json({
      mensaje: error.message,
      errores
    })
  }

  const proyecto = new Proyecto(req.body)
  proyecto.creador = req.usuario._id

  try {
    const proyectoAlmacenado = await proyecto.save()
    return res.status(200).json({
      mensaje: 'Proyecto creado correctamente',
      proyecto: proyectoAlmacenado
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

export {
  nuevoProyecto
}
