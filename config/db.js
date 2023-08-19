import mongoose from 'mongoose'

const conectarDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    console.log(`MongoDB conectado en: ${connection.connection.host}:${connection.connection.port}`)
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

export default conectarDB
