
console.log("ENTRÓ A ALUMNO ROUTES")
const { Router } = require('express')
const {alumnoValidator} = require('../middleware/alumno-validator.middleware')
const {
  getAlumnoAll,
  getAlumnoById,
  postNewAlumno,
  putAlumnoBylegajo
} = require('../controllers/alumno.controller')

const rutas = Router()

rutas.get('/', getAlumnoAll)
rutas.get('/:legajo', getAlumnoById)
rutas.post('/', alumnoValidator, postNewAlumno)
rutas.put('/:legajo', alumnoValidator, putAlumnoBylegajo)
module.exports = rutas
