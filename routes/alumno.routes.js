const { Router } = require('express')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', postNewAlumno)

module.exports = rutas
