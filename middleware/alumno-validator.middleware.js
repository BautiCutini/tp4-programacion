const alumnoValidator =  (req, res, next) => {
    console.log("ENTRÓ AL VALIDATOR")
const { nombre, apellido, email, isActive } = req.body
const error= []

    if (nombre !== undefined && (nombre === "" || typeof nombre !== 'string')) { 
        error.push("no se ingreso un caracter valido para el campo 'nombre'")  
    } 
    if (apellido !== undefined && (apellido === "" || typeof apellido !== 'string')) { 
        error.push("no se ingreso un caracter valido para el campo 'apellido'")
    }
    if (email !== undefined && (email === "" || typeof email !== 'string')) { 
        error.push("no se ingreso un caracter valido para el campo 'email'")
    }
    if (isActive !== undefined && (typeof isActive !== 'boolean')) {
    error.push("no se ingreso un caracter valido para el campo 'isActive'")
}

    if (error.length > 0) {
        return res.status(400).json({ error: error.join(", ") })
        msg: 'datos de peticion invalidos'
        error
    }
    next()
}

module.exports = { alumnoValidator }