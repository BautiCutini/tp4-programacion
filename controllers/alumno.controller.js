const fs = require('fs').promises
const { AlumnoModel } = require('../models/alumno.model')

const getAlumnoAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    return res.status(200).json(alumnos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener los datos de los alumnos' })
  }
}

const getAlumnoById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)
    const { legajo } = req.params
    const legajoId = alumnos.find(
      (a) => a.legajo.toString() === Number(legajo).toString()
    )
    if (!legajoId) {
      return res.status(404).json({ msg: `No existe el alumno con el legajo ${legajo}` })
    }
    return res.status(200).json(legajoId)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo obtener el detalle del alumno' })
  }
}

const postNewAlumno = async (req, res) => {
  try {
    const { nombre, apellido, email } = req.body

    if (!nombre || !apellido || !email) {
      return res.status(400).json({ error: 'Faltan datos para crear el alumno' })
    }

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    if (alumnos.find((a) => a.email === email)) {
      return res.status(409).json({ error: 'Ya existe un alumno con ese email' })
    }

    const legajos = alumnos.map((alumno) => alumno.legajo)
    const nuevoLegajo = Math.max(...legajos) + 1

    const nuevoAlumno = new AlumnoModel(nombre, apellido, email, nuevoLegajo)
    alumnos.push(nuevoAlumno.getAllAttributes())

    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')
    return res.status(201).json({ msg: 'Alumno creado exitosamente' })
  } catch (error) {
    console.log('ERROR PUT', error)
    return res.status(500).json({ error: 'No se pudo crear el nuevo alumno' })
  }
}

const putAlumnoBylegajo = async (req, res) => {
  console.log('ENTRÓ AL PUT')
  const { legajo } = req.params
  try {
    const { nombre, apellido, email, isActive } = req.body

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((alumno) => alumno.legajo === Number(legajo))

    if (index === -1) {
      return res.status(404).json({ error: `No se encontró el alumno con el legajo ${legajo}` })
    }

    const alumnoEncontrado = alumnos[index]

    const alumnoModificado = new AlumnoModel(
      alumnoEncontrado.nombre,
      alumnoEncontrado.apellido,
      alumnoEncontrado.email,
      alumnoEncontrado.legajo,
      alumnoEncontrado.fechaAlta,
      alumnoEncontrado.modificacion,
      alumnoEncontrado.isActive
    )

    if (nombre) alumnoModificado.setNombre(nombre)
    if (apellido) alumnoModificado.setApellido(apellido)
    if (email) alumnoModificado.setEmail(email)
    if (isActive !== undefined) alumnoModificado.setIsActive(isActive)

    alumnos[index] = alumnoModificado.getAllAttributes()

    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')
    return res.status(200).json({ msg: `Se modificó correctamente el alumno con el legajo ${legajo}` })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: `No se pudieron modificar los datos del alumno con legajo ${legajo}` })
  }
}

const deleteAlumnoById = async (req, res) => {
  try {
    const { id } = req.params

    const data = await fs.readFile('./data/alumnos.json', 'utf8')
    const alumnos = JSON.parse(data)

    const index = alumnos.findIndex((alumno) => alumno.legajo === Number(id))

    if (index === -1) {
      return res.status(404).json({ error: `No se encontro el alumno con el legajo ${id}` })
    }

    alumnos.splice(index, 1)

    await fs.writeFile('./data/alumnos.json', JSON.stringify(alumnos, null, 2), 'utf8')
    return res.status(200).json({ msg: `Se elimino correctamente el alumno con el legajo ${id}` })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo eliminar el alumno' })
  }
}

module.exports = { getAlumnoAll, getAlumnoById, postNewAlumno, putAlumnoBylegajo, deleteAlumnoById }
