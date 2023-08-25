import jwt from 'jsonwebtoken'

const generarJwt = (data) => {
  return jwt.sign({ id: data._id }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  })
}

export default generarJwt
