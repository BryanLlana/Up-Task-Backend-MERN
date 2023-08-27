import { request, response } from 'express'
import { check, validationResult } from 'express-validator'

import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'

const nuevoProyecto = async (req = request, res = response) => {
  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('cliente').trim().notEmpty().withMessage('El cliente es obligatorio').run(req)
  await check('fechaEntrega').trim().notEmpty().withMessage('La fecha es obligatoria').run(req)

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

const obtenerProyectos = async (req = request, res = response) => {
  const proyectos = await Proyecto.find().where('creador').equals(req.usuario._id)

  return res.status(200).json({
    mensaje: 'Proyectos encontrados',
    proyectos
  })
}

const obtenerProyecto = async (req = request, res = response) => {
  const { id: _id } = req.params

  let proyectoObtenido = ''
  try {
    proyectoObtenido = await Proyecto.findOne({ _id })
  } catch (err) {
    const error = new Error('Id no válida')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  if (!proyectoObtenido) {
    const error = new Error('Proyecto inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (req.usuario._id.toString() !== proyectoObtenido.creador.toString()) {
    const error = new Error('Acceso denegado')
    return res.status(400).json({
      mensaje: error.message
    })
  }

  //* Obtener las tareas del proyecto
  const tareas = await Tarea.find().where('proyecto').equals(_id)

  return res.status(200).json({
    mensaje: 'Proyecto encontrado',
    proyecto: proyectoObtenido,
    tareas
  })
}

const actualizarProyecto = async (req = request, res = response) => {
  const { id: _id } = req.params

  let proyectoObtenido = ''
  try {
    proyectoObtenido = await Proyecto.findOne({ _id })
  } catch (err) {
    const error = new Error('Id no válida')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  if (!proyectoObtenido) {
    const error = new Error('Proyecto inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (req.usuario._id.toString() !== proyectoObtenido.creador.toString()) {
    const error = new Error('Acceso denegado')
    return res.status(400).json({
      mensaje: error.message
    })
  }

  await check('nombre').trim().notEmpty().withMessage('El nombre es obligatorio').run(req)
  await check('descripcion').trim().notEmpty().withMessage('La descripcion es obligatoria').run(req)
  await check('cliente').trim().notEmpty().withMessage('El cliente es obligatorio').run(req)
  await check('fechaEntrega').trim().notEmpty().withMessage('La fecha es obligatoria').run(req)

  const errores = validationResult(req).errors.map(error => error.msg)

  if (errores.length) {
    const error = new Error('Hubo un error en el campo')
    return res.status(403).json({
      mensaje: error.message,
      errores
    })
  }

  proyectoObtenido.nombre = req.body.nombre
  proyectoObtenido.descripcion = req.body.descripcion
  proyectoObtenido.cliente = req.body.cliente
  proyectoObtenido.fechaEntrega = req.body.fechaEntrega

  try {
    const proyectoActualizado = await proyectoObtenido.save()
    return res.status(200).json({
      mensaje: 'Proyecto actualizado correctamente',
      proyecto: proyectoActualizado
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

const eliminarProyecto = async (req = request, res = response) => {
  const { id: _id } = req.params

  let proyectoObtenido = ''
  try {
    proyectoObtenido = await Proyecto.findOne({ _id })
  } catch (err) {
    const error = new Error('Id no válida')
    return res.status(403).json({
      mensaje: error.message
    })
  }

  if (!proyectoObtenido) {
    const error = new Error('Proyecto inexistente')
    return res.status(404).json({
      mensaje: error.message
    })
  }

  if (req.usuario._id.toString() !== proyectoObtenido.creador.toString()) {
    const error = new Error('Acceso denegado')
    return res.status(400).json({
      mensaje: error.message
    })
  }

  try {
    const proyectoEliminado = await proyectoObtenido.deleteOne()
    return res.status(200).json({
      mensaje: 'Proyecto eliminado correctamente',
      proyecto: proyectoEliminado
    })
  } catch (err) {
    const error = new Error('Hubo un error en el servidor')
    return res.status(400).json({
      mensaje: error.message
    })
  }
}

export {
  nuevoProyecto,
  obtenerProyectos,
  obtenerProyecto,
  actualizarProyecto,
  eliminarProyecto
}
