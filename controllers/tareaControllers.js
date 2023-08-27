import { request, response } from 'express'
import { check, validationResult } from 'express-validator'

import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const nuevaTarea = async (req = request, res = response) => {
  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('prioridad').trim().notEmpty().withMessage('La prioridad es obligatoria').run(req)
  await check('proyecto').trim().notEmpty().withMessage('El proyecto es obligatorio').run(req)
  // await check('fechaEntrega').trim().notEmpty().withMessage('La fecha es obligatoria').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  if (errores.length) {
    const error = new Error('Hubo error en los campos')
    return res.status(403).json({
      mensaje: error.message,
      errores
    })
  }

  const { proyecto: _id } = req.body

  const proyectoObtenido = await Proyecto.findOne({ _id })

  if (!proyectoObtenido) {
    const error = new Error('Proyecto inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (proyectoObtenido.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permiso denegado')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  try {
    const tareaAlmacenada = await Tarea.create(req.body)
    return res.status(200).json({
      mensaje: 'Tarea creada correctamente',
      tarea: tareaAlmacenada
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

export {
  nuevaTarea
}
