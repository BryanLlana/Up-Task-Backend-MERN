import { request, response } from 'express'
import { check, validationResult } from 'express-validator'

import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const nuevaTarea = async (req = request, res = response) => {
  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('prioridad').trim().notEmpty().withMessage('La prioridad es obligatoria').run(req)
  await check('proyecto').trim().notEmpty().withMessage('El proyecto es obligatorio').run(req)
  await check('fechaEntrega').trim().notEmpty().withMessage('La fecha es obligatoria').run(req)

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

    //* Almacenar id tarea en modelo proyecto
    proyectoObtenido.tareas = [...proyectoObtenido.tareas, tareaAlmacenada._id]
    await proyectoObtenido.save()

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

const obtenerTarea = async (req = request, res = response) => {
  const { id: _id } = req.params

  const tareaObtenida = await Tarea.findOne({ _id }).populate('proyecto')

  if (!tareaObtenida) {
    const error = new Error('Tarea inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (tareaObtenida.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permiso denegado')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  return res.status(200).json({
    mensaje: 'Tarea encontrada',
    tarea: tareaObtenida
  })
}

const actualizarTarea = async (req = request, res = response) => {
  const { id: _id } = req.params

  const tareaObtenida = await Tarea.findOne({ _id }).populate('proyecto')

  if (!tareaObtenida) {
    const error = new Error('Tarea inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (tareaObtenida.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permiso denegado')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('prioridad').trim().notEmpty().withMessage('La prioridad es obligatoria').run(req)
  await check('proyecto').trim().notEmpty().withMessage('El proyecto es obligatorio').run(req)
  await check('fechaEntrega').trim().notEmpty().withMessage('La fecha es obligatoria').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  if (errores.length) {
    const error = new Error('Hubo error en los campos')
    return res.status(403).json({
      mensaje: error.message,
      errores
    })
  }

  tareaObtenida.nombre = req.body.nombre
  tareaObtenida.descripcion = req.body.descripcion
  tareaObtenida.prioridad = req.body.prioridad
  tareaObtenida.fechaEnrega = req.body.fechaEntrega

  try {
    const tareaActualizada = await tareaObtenida.save()
    return res.status(200).json({
      mensaje: 'Tarea actualizada correctamente',
      tarea: tareaActualizada
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

const eliminarTarea = async (req = request, res = response) => {
  const { id: _id } = req.params

  const tareaObtenida = await Tarea.findOne({ _id }).populate('proyecto')

  if (!tareaObtenida) {
    const error = new Error('Tarea inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (tareaObtenida.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('Permiso denegado')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  try {
    const tareaEliminada = await tareaObtenida.deleteOne()
    return res.status(200).json({
      mensaje: 'Tarea eliminada correctamente',
      tarea: tareaEliminada
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

export {
  nuevaTarea,
  obtenerTarea,
  actualizarTarea,
  eliminarTarea
}
