import nodemailer from 'nodemailer'

const emailRegistro = async (datos) => {
  const { nombre, email, token } = datos

  const transport = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS
    }
  })

  await transport.sendMail({
    from: '"UpTask - Administrador de Proyectos" <cuentas@uptask.com>',
    to: email,
    subject: 'UpTask - Comprueba tu Cuenta',
    text: 'Comprueba tu cuenta en UpTask',
    html: `
      <p>Hola ${nombre} comprueba tu cuenta en UpTask</p>
      <p>Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace: 
        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}

export {
  emailRegistro
}
