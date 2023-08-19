import { request, response } from 'express'

const getUsuarios = (req = request, res = response) => {
  res.json({
    usuarios: 'Hola usuarios'
  })
}

export {
  getUsuarios
}
