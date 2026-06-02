"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlumnoModel = void 0;
const persona_model_1 = require("./persona.model");
class AlumnoModel extends persona_model_1.PersonaModel {
    legajo;
    fechaAlta;
    modificacion;
    isActive;
    constructor(nombre, apellido, email, legajo, fechaAlta = new Date().toISOString().split('T')[0], modificacion = new Date().toISOString().split('T')[0], isActive = true) {
        super(nombre, apellido, email);
        this.legajo = legajo,
            this.fechaAlta = fechaAlta,
            this.modificacion = modificacion,
            this.isActive = isActive;
    }
    //geters y setters
    getLegajo() {
        return this.legajo;
    }
    getIsActive() {
        return this.isActive;
    }
    setIsActive(status) {
        this.isActive = status;
    }
    getModificacion() {
        return this.modificacion;
    }
    setModificacion(fecha) {
        this.modificacion = fecha;
    }
    //polimorfismo
    getAllAttributes() {
        return {
            legajo: this.legajo,
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email,
            fechaAlta: this.fechaAlta,
            modificacion: this.modificacion,
            isActive: this.isActive
        };
    }
}
exports.AlumnoModel = AlumnoModel;
