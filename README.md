# API de Gestion de Alumnos

## Grupo e integrantes

- Numero de grupo: Grupo 1
- Integrantes:
  - Lautaro Capdeville
  - Bautista Cutini
  - Bautista Bartolini
  - Santino Crivera
  - Francesco Dicarli


## Nombre del proyecto y descripcion

**Nombre:** API de Gestion de Alumnos

**Descripcion:** proyecto backend desarrollado con Node.js, Express y TypeScript para administrar alumnos mediante una API REST. La informacion se guarda en archivos JSON locales, principalmente en `data/alumnos.json`. El sistema permite listar alumnos, buscar por legajo, crear nuevos registros, modificar datos existentes y eliminar alumnos.

El proyecto tambien incluye archivos JSON complementarios para materias y notas, y carpetas preparadas para ampliar el sistema con profesores, materias y notas.

## Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- ts-node
- nodemon
- cors
- dotenv
- Standard / ESLint
- Git y GitHub
- Postman para probar los endpoints

## Instalacion y ejecucion

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

3. La API queda disponible en:

```txt
http://localhost:3000
```

Si existe una variable `PORT` en `.env`, el servidor usa ese puerto. Si no existe, usa `3000`.

## Metodologia de trabajo con Git y GitHub

El equipo trabajo usando Git como sistema de control de versiones y GitHub como repositorio remoto para centralizar el codigo.

Metodologia aplicada:

- Se realizaron commits para registrar avances del proyecto.
- Cada integrante subio cambios relacionados con su parte del trabajo.
- Se uso GitHub para compartir el codigo entre los integrantes.
- Se mantuvo una estructura de carpetas separada por responsabilidad: rutas, controladores, modelos, middleware y datos.
- Antes de subir cambios, se recomienda ejecutar `npm run lint` para revisar el formato y posibles errores de estilo.
- Para cambios importantes, se recomienda trabajar en ramas separadas y luego integrar mediante pull request.

Flujo sugerido:

```bash
git pull
git checkout -b feature/nombre-del-cambio
git add .
git commit -m "Descripcion del cambio"
git push origin feature/nombre-del-cambio
```

## Division de archivos entre integrantes

Division propuesta segun las areas del proyecto:

- Lautaro Capdeville: trabajo sobre la funcionalidad `DELETE`, ubicada principalmente en `controllers/alumno.controller.js` con la funcion `deleteAlumnoById`, y en `routes/alumno.routes.js` con la ruta `DELETE /alumnos/:id`.
- Bautista Cutini: trabajo sobre la funcionalidad `POST`, ubicada principalmente en `controllers/alumno.controller.js` con la funcion `postNewAlumno`, en `routes/alumno.routes.js` con la ruta `POST /alumnos`, y en el uso del middleware de validacion.
- Bautista Bartolini: trabajo sobre la funcionalidad `PUT`, ubicada principalmente en `controllers/alumno.controller.js` con la funcion `putAlumnoBylegajo`, y en `routes/alumno.routes.js` con la ruta `PUT /alumnos/:legajo`.
- Santino Crivera: se encargo de dockerizar el proyecto, preparando la configuracion necesaria para ejecutar la API dentro de un contenedor.
- Francesco Dicarli: se encargo del despliegue/renderizado del proyecto en Render.

## Distribucion de archivos y carpetas

```txt
TP 4/
|-- app.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- settings.json
|-- tsconfig.json
|-- controllers/
|   |-- alumno.controller.js
|-- core/
|   |-- server.js
|-- data/
|   |-- alumnos.json
|   |-- extras/
|       |-- sys-materias.json
|       |-- sys-notas.json
|       |-- sys-profesores.json
|-- middleware/
|   |-- alumno-validator.middleware.js
|   |-- alumno-validator-put.middleware.js
|-- models/
|   |-- alumno.model.ts
|   |-- persona.model.ts
|   |-- extras/
|       |-- clase.model.ts
|       |-- nota.model.ts
|       |-- profesor.model.ts
|-- persistence/
|   |-- a.txt
|   |-- sys-databse-models/
|       |-- sys-fake-database.model.ts
|       |-- sys-log.database.model.ts
|-- routes/
|   |-- alumno.routes.js
|   |-- extras/
|       |-- materia.routes.js
|       |-- nota.routes.js
|       |-- profesor.routes.js
```

Descripcion de carpetas:

- `controllers/`: contiene la logica de cada endpoint. Actualmente esta implementado `alumno.controller.js`.
- `core/`: contiene la clase `Server`, encargada de configurar Express, middlewares, rutas y escucha del puerto.
- `data/`: contiene los archivos JSON usados como persistencia local.
- `middleware/`: contiene validaciones que se ejecutan antes de llegar al controlador.
- `models/`: contiene clases TypeScript que representan entidades del sistema.
- `persistence/`: carpeta reservada para modelos o utilidades de persistencia.
- `routes/`: define las rutas HTTP y las conecta con controladores y middlewares.

## Endpoints disponibles

El servidor monta las rutas de alumnos en:

```txt
/alumnos
```

Actualmente las rutas de materias, notas y profesores existen como archivos, pero no tienen implementacion y estan comentadas en `core/server.js`.

## Documentacion Postman

Configurar en Postman una variable de entorno:

```txt
base_url = http://localhost:3000
```

### GET - Obtener todos los alumnos

- Metodo: `GET`
- URL: `{{base_url}}/alumnos`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
[
  {
    "legajo": 10001,
    "nombre": "Mora",
    "apellido": "Garcia",
    "email": "m.garcia@facultad.edu.ar",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```

### GET - Obtener alumno por legajo

- Metodo: `GET`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `legajo`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
{
  "legajo": 10001,
  "nombre": "Mora",
  "apellido": "Garcia",
  "email": "m.garcia@facultad.edu.ar",
  "fechaAlta": "2026-03-02",
  "modificacion": "2026-03-02",
  "isActive": true
}
```

Si no existe el legajo, responde `404 Not Found`:

```json
{
  "msg": "No existe el alumno con el legajo 99999"
}
```

### POST - Crear alumno

- Metodo: `POST`
- URL: `{{base_url}}/alumnos`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "nombre": "Camila",
  "apellido": "Fernandez",
  "email": "camila.fernandez@facultad.edu.ar"
}
```

Respuesta esperada `201 Created`:

```json
{
  "msg": "Alumno creado exitosamente"
}
```

Validaciones:

- `nombre` debe ser string y no puede estar vacio.
- `apellido` debe ser string y no puede estar vacio.
- `email` debe ser string y no puede estar vacio.
- No se permite crear un alumno con un email ya existente.

Errores posibles:

- `400 Bad Request`: faltan datos o los datos no son validos.
- `409 Conflict`: ya existe un alumno con el mismo email.
- `500 Internal Server Error`: error al leer o escribir el archivo JSON.

### PUT - Modificar alumno por legajo

- Metodo: `PUT`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `legajo`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "nombre": "Camila",
  "apellido": "Fernandez",
  "email": "camila.fernandez@facultad.edu.ar",
  "isActive": true
}
```

Respuesta esperada `200 OK`:

```json
{
  "msg": "Se modifico correctamente el alumno con el legajo 10001"
}
```

Validaciones:

- Los campos enviados deben tener el tipo correcto.
- `nombre`, `apellido` y `email` deben ser string si se envian.
- `isActive` debe ser boolean si se envia.
- Si el legajo no existe, responde `404 Not Found`.

### DELETE - Eliminar alumno por legajo

- Metodo: `DELETE`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `id`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
{
  "msg": "Se elimino correctamente el alumno con el legajo 10001"
}
```

Si no existe el alumno, responde `404 Not Found`:

```json
{
  "error": "No se encontro el alumno con el legajo 10001"
}
```

## Funciones explicadas

### `app.js`

#### `new Server()`

Crea una instancia de la clase `Server`, definida en `core/server.js`. Esta instancia inicializa Express, configura middlewares, registra rutas y prepara el puerto.

#### `servidor.listen()`

Ejecuta el metodo `listen()` de la clase `Server`. Inicia la API y deja el servidor escuchando peticiones HTTP.

### `core/server.js`

#### `constructor()`

Inicializa las propiedades principales del servidor:

- `this.app`: instancia de Express.
- `this.port`: puerto tomado desde `process.env.PORT` o `3000`.

Luego llama a:

- `this.middleware()`
- `this.rutas()`

#### `middleware()`

Configura middlewares globales:

- `cors()`: permite recibir peticiones desde otros origenes.
- `express.json()`: permite leer cuerpos JSON enviados por Postman o por un frontend.

#### `rutas()`

Registra las rutas de la API. Actualmente monta:

```js
this.app.use('/alumnos', require('../routes/alumno.routes'))
```

Tambien define manejadores de error:

- Respuesta `404` para rutas inexistentes.
- Manejadores para errores generales.

Las rutas de materias, notas y profesores estan comentadas, por lo que no estan activas.

#### `listen()`

Inicia el servidor con `this.app.listen(this.port)`. Cuando el servidor queda activo, muestra por consola el puerto utilizado.

### `routes/alumno.routes.js`

#### `Router()`

Crea un router de Express para separar las rutas de alumnos del archivo principal del servidor.

#### `rutas.get('/', getAlumnoAll)`

Asocia `GET /alumnos` con la funcion `getAlumnoAll`. Se usa para devolver todos los alumnos.

#### `rutas.get('/:legajo', getAlumnoById)`

Asocia `GET /alumnos/:legajo` con la funcion `getAlumnoById`. Se usa para buscar un alumno puntual por su legajo.

#### `rutas.post('/', alumnoValidator, postNewAlumno)`

Asocia `POST /alumnos` con el middleware `alumnoValidator` y luego con `postNewAlumno`. Primero valida los datos recibidos y despues crea el alumno.

#### `rutas.put('/:legajo', alumnoValidator, putAlumnoBylegajo)`

Asocia `PUT /alumnos/:legajo` con el middleware `alumnoValidator` y luego con `putAlumnoBylegajo`. Permite modificar datos de un alumno existente.

#### `rutas.delete('/:id', deleteAlumnoById)`

Asocia `DELETE /alumnos/:id` con `deleteAlumnoById`. Elimina un alumno cuyo legajo coincida con el parametro `id`.

### `controllers/alumno.controller.js`

#### `getAlumnoAll(req, res)`

Lee el archivo `data/alumnos.json` usando `fs.readFile`, convierte el contenido de texto a objeto JavaScript con `JSON.parse` y devuelve el listado completo de alumnos con estado `200`.

Si ocurre un error al leer o parsear el archivo, responde con estado `500`.

#### `getAlumnoById(req, res)`

Lee todos los alumnos desde `data/alumnos.json`. Luego toma el parametro `legajo` desde `req.params` y busca un alumno cuyo `legajo` coincida.

Si encuentra el alumno, responde con estado `200` y el objeto del alumno. Si no lo encuentra, responde con estado `404`.

#### `postNewAlumno(req, res)`

Crea un nuevo alumno. Primero toma `nombre`, `apellido` y `email` desde `req.body`. Si falta algun dato obligatorio, responde `400`.

Despues lee el JSON de alumnos y verifica que no exista otro alumno con el mismo email. Si el email ya existe, responde `409`.

Si los datos son validos:

- Obtiene todos los legajos existentes.
- Calcula el nuevo legajo con `Math.max(...legajos) + 1`.
- Crea una instancia de `AlumnoModel`.
- Convierte la instancia a objeto plano con `getAllAttributes()`.
- Agrega el nuevo alumno al array.
- Guarda el archivo actualizado con `fs.writeFile`.

Finalmente responde `201`.

#### `putAlumnoBylegajo(req, res)`

Modifica un alumno existente. Toma el `legajo` desde `req.params` y los datos nuevos desde `req.body`.

Luego:

- Lee `data/alumnos.json`.
- Busca el indice del alumno con `findIndex`.
- Si no existe, responde `404`.
- Si existe, crea una instancia de `AlumnoModel` con los datos actuales.
- Actualiza solo los campos enviados: `nombre`, `apellido`, `email` e `isActive`.
- Reemplaza el alumno anterior por el modificado.
- Guarda el JSON actualizado.

Finalmente responde `200`.

#### `deleteAlumnoById(req, res)`

Elimina un alumno segun el parametro `id`, que representa el legajo.

Luego:

- Lee `data/alumnos.json`.
- Busca el indice del alumno con `findIndex`.
- Si no existe, responde `404`.
- Si existe, lo elimina del array usando `splice`.
- Guarda el archivo actualizado.

Finalmente responde `200`.

### `middleware/alumno-validator.middleware.js`

#### `alumnoValidator(req, res, next)`

Valida los campos recibidos en el body antes de crear o modificar alumnos.

Reglas:

- Si `nombre` viene definido, debe ser string y no estar vacio.
- Si `apellido` viene definido, debe ser string y no estar vacio.
- Si `email` viene definido, debe ser string y no estar vacio.
- Si `isActive` viene definido, debe ser boolean.

Si encuentra errores, responde `400` con el detalle. Si no encuentra errores, llama a `next()` para continuar hacia el controlador.

### `middleware/alumno-validator-put.middleware.js`

#### `alumnoValidator(req, res, next)`

Es una version mas estricta del validador. Exige que `nombre`, `apellido`, `email` e `isActive` existan siempre y tengan tipos validos.

Actualmente este archivo no esta conectado en `routes/alumno.routes.js`, porque las rutas usan `middleware/alumno-validator.middleware.js`.

### `models/persona.model.ts`

#### `constructor(nombre, apellido, email)`

Inicializa los atributos protegidos de una persona:

- `nombre`
- `apellido`
- `email`

Al ser `protected`, pueden ser usados por clases hijas como `AlumnoModel`.

#### `getNombre()`

Devuelve el nombre actual.

#### `setNombre(nombre)`

Modifica el nombre del objeto.

#### `getApellido()`

Devuelve el apellido actual.

#### `setApellido(apellido)`

Modifica el apellido del objeto.

#### `getNombreCompleto()`

Devuelve un string con nombre y apellido unidos.

#### `getEmail()`

Devuelve el email actual.

#### `setEmail(email)`

Modifica el email del objeto.

#### `getAllAttributes()`

Devuelve un objeto plano con los datos principales de la persona. Esto facilita guardar o responder datos en formato JSON.

### `models/alumno.model.ts`

#### `constructor(nombre, apellido, email, legajo, fechaAlta, modificacion, isActive)`

Inicializa un alumno. Hereda `nombre`, `apellido` y `email` desde `PersonaModel`, y agrega:

- `legajo`
- `fechaAlta`
- `modificacion`
- `isActive`

Si no se envian fechas, usa la fecha actual en formato `YYYY-MM-DD`. Si no se envia `isActive`, se inicializa en `true`.

#### `getLegajo()`

Devuelve el legajo del alumno.

#### `getIsActive()`

Devuelve si el alumno esta activo.

#### `setIsActive(status)`

Modifica el estado activo/inactivo del alumno.

#### `getModificacion()`

Devuelve la fecha de modificacion registrada.

#### `setModificacion(fecha)`

Actualiza la fecha de modificacion.

#### `getAllAttributes()`

Sobrescribe el metodo de `PersonaModel` y devuelve todos los datos del alumno:

- `legajo`
- `nombre`
- `apellido`
- `email`
- `fechaAlta`
- `modificacion`
- `isActive`

Este metodo se usa antes de guardar el alumno en el archivo JSON.

## Estructura de archivos JSON

Cada archivo JSON contiene un array independiente. No se mezclan distintos arrays dentro del mismo archivo.

### `data/alumnos.json`

```json
[
  {
    "legajo": 10001,
    "nombre": "Mora",
    "apellido": "Garcia",
    "email": "m.garcia@facultad.edu.ar",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```

Campos:

- `legajo`: numero unico del alumno.
- `nombre`: nombre del alumno.
- `apellido`: apellido del alumno.
- `email`: correo electronico.
- `fechaAlta`: fecha de creacion del registro.
- `modificacion`: fecha de ultima modificacion.
- `isActive`: indica si el alumno esta activo.

### `data/extras/sys-materias.json`

```json
[
  {
    "idMateria": "MAT101",
    "nombre": "Matematica I",
    "cuatrimestre": 1
  }
]
```

Campos:

- `idMateria`: identificador unico de la materia.
- `nombre`: nombre de la materia.
- `cuatrimestre`: cuatrimestre al que pertenece.

### `data/extras/sys-notas.json`

```json
[
  {
    "id": 1,
    "legajo": 10001,
    "idMateria": "MAT101",
    "nota": 9,
    "fecha": "03-04-24"
  }
]
```

Campos:

- `id`: identificador unico de la nota.
- `legajo`: legajo del alumno relacionado.
- `idMateria`: identificador de la materia relacionada.
- `nota`: calificacion obtenida.
- `fecha`: fecha en la que se registro la nota.

### `data/extras/sys-profesores.json`

Actualmente el archivo esta vacio. Una estructura minima sugerida seria:

```json
[
  {
    "idProfesor": 1,
    "nombre": "Ana",
    "apellido": "Gomez",
    "email": "ana.gomez@facultad.edu.ar",
    "idMateria": "MAT101"
  }
]
```

Campos sugeridos:

- `idProfesor`: identificador unico del profesor.
- `nombre`: nombre del profesor.
- `apellido`: apellido del profesor.
- `email`: correo electronico.
- `idMateria`: materia asociada.

## Validaciones generales

La API valida que los datos enviados tengan formato correcto antes de modificar el JSON.

Reglas principales:

- `nombre`: string no vacio.
- `apellido`: string no vacio.
- `email`: string no vacio.
- `isActive`: boolean.
- `legajo`: se recibe por parametro y se compara como numero.

## Codigos de estado usados

- `200 OK`: operacion exitosa de lectura, modificacion o eliminacion.
- `201 Created`: alumno creado correctamente.
- `400 Bad Request`: datos faltantes o invalidos.
- `404 Not Found`: recurso no encontrado.
- `409 Conflict`: conflicto por email duplicado.
- `500 Internal Server Error`: error interno al leer o escribir archivos.

## Links

- Deploy en Render: pendiente de agregar.
# API de Gestion de Alumnos

## Grupo e integrantes

- Numero de grupo: Grupo 1
- Integrantes:
  - Lautaro Capdeville
  - Bautista Cutini
  - Bautista Bartolini
  - Santino Crivera
  - Francesco Dicarli


## Nombre del proyecto y descripcion

**Nombre:** API de Gestion de Alumnos

**Descripcion:** proyecto backend desarrollado con Node.js, Express y TypeScript para administrar alumnos mediante una API REST. La informacion se guarda en archivos JSON locales, principalmente en `data/alumnos.json`. El sistema permite listar alumnos, buscar por legajo, crear nuevos registros, modificar datos existentes y eliminar alumnos.

El proyecto tambien incluye archivos JSON complementarios para materias y notas, y carpetas preparadas para ampliar el sistema con profesores, materias y notas.

## Tecnologias utilizadas

- Node.js
- Express
- TypeScript
- ts-node
- nodemon
- cors
- dotenv
- Standard / ESLint
- Git y GitHub
- Postman para probar los endpoints

## Instalacion y ejecucion

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

3. La API queda disponible en:

```txt
http://localhost:3000
```

Si existe una variable `PORT` en `.env`, el servidor usa ese puerto. Si no existe, usa `3000`.

## Metodologia de trabajo con Git y GitHub

El equipo trabajo usando Git como sistema de control de versiones y GitHub como repositorio remoto para centralizar el codigo.

Metodologia aplicada:

- Se realizaron commits para registrar avances del proyecto.
- Cada integrante subio cambios relacionados con su parte del trabajo.
- Se uso GitHub para compartir el codigo entre los integrantes.
- Se mantuvo una estructura de carpetas separada por responsabilidad: rutas, controladores, modelos, middleware y datos.
- Antes de subir cambios, se recomienda ejecutar `npm run lint` para revisar el formato y posibles errores de estilo.
- Para cambios importantes, se recomienda trabajar en ramas separadas y luego integrar mediante pull request.

Flujo sugerido:

```bash
git pull
git checkout -b feature/nombre-del-cambio
git add .
git commit -m "Descripcion del cambio"
git push origin feature/nombre-del-cambio
```

## Division de archivos entre integrantes

Division propuesta segun las areas del proyecto:

- Lautaro: configuracion general del servidor, `app.js`, `core/server.js`, dependencias y estructura base del proyecto.
- Bautista Cutini: rutas, controlador principal de alumnos y pruebas de endpoints en Postman.
- Maria Victoria Ruiz: modelos, archivos JSON de datos, validaciones y documentacion.

> Esta division puede ajustarse si el equipo necesita reflejar exactamente quien trabajo cada archivo.

## Distribucion de archivos y carpetas

```txt
TP 4/
|-- app.js
|-- package.json
|-- package-lock.json
|-- README.md
|-- settings.json
|-- tsconfig.json
|-- controllers/
|   |-- alumno.controller.js
|-- core/
|   |-- server.js
|-- data/
|   |-- alumnos.json
|   |-- extras/
|       |-- sys-materias.json
|       |-- sys-notas.json
|       |-- sys-profesores.json
|-- middleware/
|   |-- alumno-validator.middleware.js
|   |-- alumno-validator-put.middleware.js
|-- models/
|   |-- alumno.model.ts
|   |-- persona.model.ts
|   |-- extras/
|       |-- clase.model.ts
|       |-- nota.model.ts
|       |-- profesor.model.ts
|-- persistence/
|   |-- a.txt
|   |-- sys-databse-models/
|       |-- sys-fake-database.model.ts
|       |-- sys-log.database.model.ts
|-- routes/
|   |-- alumno.routes.js
|   |-- extras/
|       |-- materia.routes.js
|       |-- nota.routes.js
|       |-- profesor.routes.js
```

Descripcion de carpetas:

- `controllers/`: contiene la logica de cada endpoint. Actualmente esta implementado `alumno.controller.js`.
- `core/`: contiene la clase `Server`, encargada de configurar Express, middlewares, rutas y escucha del puerto.
- `data/`: contiene los archivos JSON usados como persistencia local.
- `middleware/`: contiene validaciones que se ejecutan antes de llegar al controlador.
- `models/`: contiene clases TypeScript que representan entidades del sistema.
- `persistence/`: carpeta reservada para modelos o utilidades de persistencia.
- `routes/`: define las rutas HTTP y las conecta con controladores y middlewares.

## Endpoints disponibles

El servidor monta las rutas de alumnos en:

```txt
/alumnos
```

Actualmente las rutas de materias, notas y profesores existen como archivos, pero no tienen implementacion y estan comentadas en `core/server.js`.

## Documentacion Postman

Configurar en Postman una variable de entorno:

```txt
base_url = http://localhost:3000
```

### GET - Obtener todos los alumnos

- Metodo: `GET`
- URL: `{{base_url}}/alumnos`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
[
  {
    "legajo": 10001,
    "nombre": "Mora",
    "apellido": "Garcia",
    "email": "m.garcia@facultad.edu.ar",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```

### GET - Obtener alumno por legajo

- Metodo: `GET`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `legajo`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
{
  "legajo": 10001,
  "nombre": "Mora",
  "apellido": "Garcia",
  "email": "m.garcia@facultad.edu.ar",
  "fechaAlta": "2026-03-02",
  "modificacion": "2026-03-02",
  "isActive": true
}
```

Si no existe el legajo, responde `404 Not Found`:

```json
{
  "msg": "No existe el alumno con el legajo 99999"
}
```

### POST - Crear alumno

- Metodo: `POST`
- URL: `{{base_url}}/alumnos`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "nombre": "Camila",
  "apellido": "Fernandez",
  "email": "camila.fernandez@facultad.edu.ar"
}
```

Respuesta esperada `201 Created`:

```json
{
  "msg": "Alumno creado exitosamente"
}
```

Validaciones:

- `nombre` debe ser string y no puede estar vacio.
- `apellido` debe ser string y no puede estar vacio.
- `email` debe ser string y no puede estar vacio.
- No se permite crear un alumno con un email ya existente.

Errores posibles:

- `400 Bad Request`: faltan datos o los datos no son validos.
- `409 Conflict`: ya existe un alumno con el mismo email.
- `500 Internal Server Error`: error al leer o escribir el archivo JSON.

### PUT - Modificar alumno por legajo

- Metodo: `PUT`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `legajo`
- Headers:
  - `Content-Type: application/json`
- Body:

```json
{
  "nombre": "Camila",
  "apellido": "Fernandez",
  "email": "camila.fernandez@facultad.edu.ar",
  "isActive": true
}
```

Respuesta esperada `200 OK`:

```json
{
  "msg": "Se modifico correctamente el alumno con el legajo 10001"
}
```

Validaciones:

- Los campos enviados deben tener el tipo correcto.
- `nombre`, `apellido` y `email` deben ser string si se envian.
- `isActive` debe ser boolean si se envia.
- Si el legajo no existe, responde `404 Not Found`.

### DELETE - Eliminar alumno por legajo

- Metodo: `DELETE`
- URL: `{{base_url}}/alumnos/10001`
- Parametro de ruta: `id`
- Body: no requiere

Respuesta esperada `200 OK`:

```json
{
  "msg": "Se elimino correctamente el alumno con el legajo 10001"
}
```

Si no existe el alumno, responde `404 Not Found`:

```json
{
  "error": "No se encontro el alumno con el legajo 10001"
}
```

## Funciones explicadas

### `app.js`

#### `new Server()`

Crea una instancia de la clase `Server`, definida en `core/server.js`. Esta instancia inicializa Express, configura middlewares, registra rutas y prepara el puerto.

#### `servidor.listen()`

Ejecuta el metodo `listen()` de la clase `Server`. Inicia la API y deja el servidor escuchando peticiones HTTP.

### `core/server.js`

#### `constructor()`

Inicializa las propiedades principales del servidor:

- `this.app`: instancia de Express.
- `this.port`: puerto tomado desde `process.env.PORT` o `3000`.

Luego llama a:

- `this.middleware()`
- `this.rutas()`

#### `middleware()`

Configura middlewares globales:

- `cors()`: permite recibir peticiones desde otros origenes.
- `express.json()`: permite leer cuerpos JSON enviados por Postman o por un frontend.

#### `rutas()`

Registra las rutas de la API. Actualmente monta:

```js
this.app.use('/alumnos', require('../routes/alumno.routes'))
```

Tambien define manejadores de error:

- Respuesta `404` para rutas inexistentes.
- Manejadores para errores generales.

Las rutas de materias, notas y profesores estan comentadas, por lo que no estan activas.

#### `listen()`

Inicia el servidor con `this.app.listen(this.port)`. Cuando el servidor queda activo, muestra por consola el puerto utilizado.

### `routes/alumno.routes.js`

#### `Router()`

Crea un router de Express para separar las rutas de alumnos del archivo principal del servidor.

#### `rutas.get('/', getAlumnoAll)`

Asocia `GET /alumnos` con la funcion `getAlumnoAll`. Se usa para devolver todos los alumnos.

#### `rutas.get('/:legajo', getAlumnoById)`

Asocia `GET /alumnos/:legajo` con la funcion `getAlumnoById`. Se usa para buscar un alumno puntual por su legajo.

#### `rutas.post('/', alumnoValidator, postNewAlumno)`

Asocia `POST /alumnos` con el middleware `alumnoValidator` y luego con `postNewAlumno`. Primero valida los datos recibidos y despues crea el alumno.

#### `rutas.put('/:legajo', alumnoValidator, putAlumnoBylegajo)`

Asocia `PUT /alumnos/:legajo` con el middleware `alumnoValidator` y luego con `putAlumnoBylegajo`. Permite modificar datos de un alumno existente.

#### `rutas.delete('/:id', deleteAlumnoById)`

Asocia `DELETE /alumnos/:id` con `deleteAlumnoById`. Elimina un alumno cuyo legajo coincida con el parametro `id`.

### `controllers/alumno.controller.js`

#### `getAlumnoAll(req, res)`

Lee el archivo `data/alumnos.json` usando `fs.readFile`, convierte el contenido de texto a objeto JavaScript con `JSON.parse` y devuelve el listado completo de alumnos con estado `200`.

Si ocurre un error al leer o parsear el archivo, responde con estado `500`.

#### `getAlumnoById(req, res)`

Lee todos los alumnos desde `data/alumnos.json`. Luego toma el parametro `legajo` desde `req.params` y busca un alumno cuyo `legajo` coincida.

Si encuentra el alumno, responde con estado `200` y el objeto del alumno. Si no lo encuentra, responde con estado `404`.

#### `postNewAlumno(req, res)`

Crea un nuevo alumno. Primero toma `nombre`, `apellido` y `email` desde `req.body`. Si falta algun dato obligatorio, responde `400`.

Despues lee el JSON de alumnos y verifica que no exista otro alumno con el mismo email. Si el email ya existe, responde `409`.

Si los datos son validos:

- Obtiene todos los legajos existentes.
- Calcula el nuevo legajo con `Math.max(...legajos) + 1`.
- Crea una instancia de `AlumnoModel`.
- Convierte la instancia a objeto plano con `getAllAttributes()`.
- Agrega el nuevo alumno al array.
- Guarda el archivo actualizado con `fs.writeFile`.

Finalmente responde `201`.

#### `putAlumnoBylegajo(req, res)`

Modifica un alumno existente. Toma el `legajo` desde `req.params` y los datos nuevos desde `req.body`.

Luego:

- Lee `data/alumnos.json`.
- Busca el indice del alumno con `findIndex`.
- Si no existe, responde `404`.
- Si existe, crea una instancia de `AlumnoModel` con los datos actuales.
- Actualiza solo los campos enviados: `nombre`, `apellido`, `email` e `isActive`.
- Reemplaza el alumno anterior por el modificado.
- Guarda el JSON actualizado.

Finalmente responde `200`.

#### `deleteAlumnoById(req, res)`

Elimina un alumno segun el parametro `id`, que representa el legajo.

Luego:

- Lee `data/alumnos.json`.
- Busca el indice del alumno con `findIndex`.
- Si no existe, responde `404`.
- Si existe, lo elimina del array usando `splice`.
- Guarda el archivo actualizado.

Finalmente responde `200`.

### `middleware/alumno-validator.middleware.js`

#### `alumnoValidator(req, res, next)`

Valida los campos recibidos en el body antes de crear o modificar alumnos.

Reglas:

- Si `nombre` viene definido, debe ser string y no estar vacio.
- Si `apellido` viene definido, debe ser string y no estar vacio.
- Si `email` viene definido, debe ser string y no estar vacio.
- Si `isActive` viene definido, debe ser boolean.

Si encuentra errores, responde `400` con el detalle. Si no encuentra errores, llama a `next()` para continuar hacia el controlador.

### `middleware/alumno-validator-put.middleware.js`

#### `alumnoValidator(req, res, next)`

Es una version mas estricta del validador. Exige que `nombre`, `apellido`, `email` e `isActive` existan siempre y tengan tipos validos.

Actualmente este archivo no esta conectado en `routes/alumno.routes.js`, porque las rutas usan `middleware/alumno-validator.middleware.js`.

### `models/persona.model.ts`

#### `constructor(nombre, apellido, email)`

Inicializa los atributos protegidos de una persona:

- `nombre`
- `apellido`
- `email`

Al ser `protected`, pueden ser usados por clases hijas como `AlumnoModel`.

#### `getNombre()`

Devuelve el nombre actual.

#### `setNombre(nombre)`

Modifica el nombre del objeto.

#### `getApellido()`

Devuelve el apellido actual.

#### `setApellido(apellido)`

Modifica el apellido del objeto.

#### `getNombreCompleto()`

Devuelve un string con nombre y apellido unidos.

#### `getEmail()`

Devuelve el email actual.

#### `setEmail(email)`

Modifica el email del objeto.

#### `getAllAttributes()`

Devuelve un objeto plano con los datos principales de la persona. Esto facilita guardar o responder datos en formato JSON.

### `models/alumno.model.ts`

#### `constructor(nombre, apellido, email, legajo, fechaAlta, modificacion, isActive)`

Inicializa un alumno. Hereda `nombre`, `apellido` y `email` desde `PersonaModel`, y agrega:

- `legajo`
- `fechaAlta`
- `modificacion`
- `isActive`

Si no se envian fechas, usa la fecha actual en formato `YYYY-MM-DD`. Si no se envia `isActive`, se inicializa en `true`.

#### `getLegajo()`

Devuelve el legajo del alumno.

#### `getIsActive()`

Devuelve si el alumno esta activo.

#### `setIsActive(status)`

Modifica el estado activo/inactivo del alumno.

#### `getModificacion()`

Devuelve la fecha de modificacion registrada.

#### `setModificacion(fecha)`

Actualiza la fecha de modificacion.

#### `getAllAttributes()`

Sobrescribe el metodo de `PersonaModel` y devuelve todos los datos del alumno:

- `legajo`
- `nombre`
- `apellido`
- `email`
- `fechaAlta`
- `modificacion`
- `isActive`

Este metodo se usa antes de guardar el alumno en el archivo JSON.

## Estructura de archivos JSON

Cada archivo JSON contiene un array independiente. No se mezclan distintos arrays dentro del mismo archivo.

### `data/alumnos.json`

```json
[
  {
    "legajo": 10001,
    "nombre": "Mora",
    "apellido": "Garcia",
    "email": "m.garcia@facultad.edu.ar",
    "fechaAlta": "2026-03-02",
    "modificacion": "2026-03-02",
    "isActive": true
  }
]
```

Campos:

- `legajo`: numero unico del alumno.
- `nombre`: nombre del alumno.
- `apellido`: apellido del alumno.
- `email`: correo electronico.
- `fechaAlta`: fecha de creacion del registro.
- `modificacion`: fecha de ultima modificacion.
- `isActive`: indica si el alumno esta activo.

### `data/extras/sys-materias.json`

```json
[
  {
    "idMateria": "MAT101",
    "nombre": "Matematica I",
    "cuatrimestre": 1
  }
]
```

Campos:

- `idMateria`: identificador unico de la materia.
- `nombre`: nombre de la materia.
- `cuatrimestre`: cuatrimestre al que pertenece.

### `data/extras/sys-notas.json`

```json
[
  {
    "id": 1,
    "legajo": 10001,
    "idMateria": "MAT101",
    "nota": 9,
    "fecha": "03-04-24"
  }
]
```

Campos:

- `id`: identificador unico de la nota.
- `legajo`: legajo del alumno relacionado.
- `idMateria`: identificador de la materia relacionada.
- `nota`: calificacion obtenida.
- `fecha`: fecha en la que se registro la nota.

### `data/extras/sys-profesores.json`

Actualmente el archivo esta vacio. Una estructura minima sugerida seria:

```json
[
  {
    "idProfesor": 1,
    "nombre": "Ana",
    "apellido": "Gomez",
    "email": "ana.gomez@facultad.edu.ar",
    "idMateria": "MAT101"
  }
]
```

Campos sugeridos:

- `idProfesor`: identificador unico del profesor.
- `nombre`: nombre del profesor.
- `apellido`: apellido del profesor.
- `email`: correo electronico.
- `idMateria`: materia asociada.

## Validaciones generales

La API valida que los datos enviados tengan formato correcto antes de modificar el JSON.

Reglas principales:

- `nombre`: string no vacio.
- `apellido`: string no vacio.
- `email`: string no vacio.
- `isActive`: boolean.
- `legajo`: se recibe por parametro y se compara como numero.

## Codigos de estado usados

- `200 OK`: operacion exitosa de lectura, modificacion o eliminacion.
- `201 Created`: alumno creado correctamente.
- `400 Bad Request`: datos faltantes o invalidos.
- `404 Not Found`: recurso no encontrado.
- `409 Conflict`: conflicto por email duplicado.
- `500 Internal Server Error`: error interno al leer o escribir archivos.

## Links

URL Render:
https://tp4-programacion.onrender.com

Endpoint probado:
/alumnos
