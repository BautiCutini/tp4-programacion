const fs = require('fs').promises
const {AlumnoModel} = require('../models/alumno.model')

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ error: 'No se puedieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const { legajo } = req.params

    const legajoId = alumnos.find(
      (a) => a.legajo /* .toString() */ === Number(legajo)
    )

    if (!legajoId) {
      return res
        .status(404)
        .json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }

    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).JSON({
      error: 'No se pudo obtener el datalle del alumno con legajo n° {legajo}'
    })
  }
}

const postNewAlumno = async (req, res) => {
  try {
    const {nombre,apellido,email} = req.body

    /* validacion de que no falte ningun dato en el body */
    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'Faltan datos para crear el alumno' })
    }

  const data = await fs.readFile('./data/alumnos.json', 'utf8')
  const alumnos = JSON.parse(data)

   /* validacion de que no haya otro alumno con el mismo email */
    if (alumnos.find((a) => a.email === email)) {
      return res.status(409).json({ error: 'Ya existe un alumno con ese email' })
    }



  console.log('Se parseo la info a "alumnos"')

  const legajos = alumnos.map((alumno) => alumno.legajo)
  const nuevoLegajo = Math.max(...legajos) + 1
  console.log('Se creo el nuevo legajo')

  const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)

  console.log(nuevoAlumno)
  const alumnoNuevo = nuevoAlumno.getAllAttributes()
  alumnos.push(alumnoNuevo)
  console.log(nuevoAlumno.getAllAttributes())

  await fs.writeFile(
    './data/alumnos.json', 
    JSON.stringify(alumnos,null, 2),
    'utf8'
  )
  return res.status(201).json({
    msg: 'Alumno creado exitosamente'
  })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo crear el nuevo alumno' })
  }



}


module.exports = { getAlumnoAll, getAlumnoById, postNewAlumno }
