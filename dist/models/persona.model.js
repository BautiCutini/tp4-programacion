"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersonaModel = void 0;
class PersonaModel {
    nombre;
    apellido;
    email;
    constructor(nombre, apellido, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
    }
    // nombre
    getNombre() {
        return this.nombre;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    // apellido
    getApellido() {
        return this.apellido;
    }
    setApellido(apellido) {
        this.apellido = apellido;
    }
    // nombre completo (nombre + apelido)
    getNombreCompleto() {
        return `${this.nombre} ${this.apellido}`;
    }
    // email
    getEmail() {
        return this.email;
    }
    setEmail(email) {
        this.email = email;
    }
    // devolver todos los atributos en un objeto literal/plano (es como un JSON)
    getAllAttributes() {
        return {
            nombre: this.nombre,
            apellido: this.apellido,
            email: this.email
        };
    }
}
exports.PersonaModel = PersonaModel;
