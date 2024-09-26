const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para parsear JSON
app.use(express.json());

// Habilitar CORS
app.use(cors());

// Endpoint para invertir un arreglo
app.post('/array/invert', (req, res) => {
    const { array } = req.body;

    // Verificar que el cuerpo de la solicitud contenga un arreglo
    if (!Array.isArray(array)) {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe contener un arreglo.' });
    }

    // Invertir el arreglo
    const invertedArray = array.reverse();

    // Enviar la respuesta con el arreglo invertido
    res.json({ invertedArray });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});





//-----------------------///




// Arreglo de nombres mexicanos más comunes (2D)
const nombresComunes = [
    ['Sofía', 'Mateo', 'Valentina', 'Sebastián', 'Camila'],
    ['Diego', 'María', 'Leonardo', 'Valeria', 'Hugo'],
    ['Ana', 'Daniel', 'Mariana', 'Luis', 'Ximena'],
    ['Andrés', 'Victoria', 'Pablo', 'Lucía', 'Emilio'],
    ['Salma', 'José', 'Diana', 'Antonio', 'Fernanda']
];

// Endpoint para verificar si un nombre existe en el arreglo
app.post('/nombres/existe', (req, res) => {
    const { nombre } = req.body;

    if (typeof nombre !== 'string') {
        return res.status(400).json({ message: 'El cuerpo de la solicitud debe contener un nombre válido.' });
    }

    // Verificar si el nombre existe en el arreglo de nombres comunes
    const existe = nombresComunes.flat().includes(nombre);

    // Enviar la respuesta
    res.json({ existe });
});



///---------------------------------////


// Almacenar los pesos
let pesos = [];

// Endpoint para almacenar pesos
app.post('/pesos', (req, res) => {
    const { pesoEntrante } = req.body;

    // Verificar que el peso es un número
    if (typeof pesoEntrante !== 'number' || isNaN(pesoEntrante)) {
        return res.status(400).json({ message: 'El peso debe ser un número.' });
    }

    // Agregar el peso al arreglo
    pesos.push(pesoEntrante);

    // Verificar si ya se han ingresado 10 pesos
    if (pesos.length === 10) {
        const promedio = pesos.reduce((sum, peso) => sum + peso, 0) / pesos.length;
        const mayoresQuePromedio = pesos.filter(peso => peso > promedio).length;
        const menoresQuePromedio = pesos.filter(peso => peso < promedio).length;

        // Reiniciar el arreglo de pesos para el siguiente ciclo
        pesos = [];

        // Enviar la respuesta con los resultados
        return res.json({
            promedio,
            mayoresQuePromedio,
            menoresQuePromedio
        });
    }

    // Enviar respuesta indicando que se debe seguir ingresando pesos
    return res.json({ message: 'Peso almacenado, ingrese más pesos.' });
});



//-----------------------------------///



// Almacenar las notas de los cursos
const cursos = {
    "Estructura de datos": [],
    "Desarrollo de Aplicaciones": [],
    "Ingeniería de Software": [],
    "Administración de Base de Datos": [],
    "Inglés IV": []
};

// Endpoint para agregar una nota
app.post('/notas/agregar', (req, res) => {
    const { curso, nota } = req.body;

    // Verificar si el curso es válido
    if (!cursos.hasOwnProperty(curso)) {
        return res.status(400).json({ message: 'Curso no válido.' });
    }

    // Verificar que la nota sea un número entre 0 y 100
    if (typeof nota !== 'number' || nota < 0 || nota > 100) {
        return res.status(400).json({ message: 'La nota debe ser un número entre 0 y 100.' });
    }

    // Agregar la nota al curso correspondiente
    cursos[curso].push(nota);
    res.json({ message: 'Nota agregada correctamente.' });
});

// Endpoint para obtener el curso con mayor promedio
app.get('/notas/promedio', (req, res) => {
    let maxPromedio = -1;
    let cursosConMayorPromedio = [];

    for (const curso in cursos) {
        const notas = cursos[curso];
        const suma = notas.reduce((a, b) => a + b, 0);
        const promedio = notas.length > 0 ? suma / notas.length : 0;

        if (promedio > maxPromedio) {
            maxPromedio = promedio;
            cursosConMayorPromedio = [curso];
        } else if (promedio === maxPromedio) {
            cursosConMayorPromedio.push(curso);
        }
    }

    res.json({ cursos: cursosConMayorPromedio, promedio: maxPromedio });
});


//------------------------///


// Array para almacenar la información de los empleados
const empleados = [];

// Endpoint para ingresar los sueldos y calcular resultados
app.post('/sueldos', (req, res) => {
    const { nombre, sueldos } = req.body;

    if (!nombre || !Array.isArray(sueldos) || sueldos.length !== 10) {
        return res.status(400).json({ message: 'Debe proporcionar un nombre y 10 sueldos (2 por mes durante 5 meses).' });
    }

    // Agregar empleado al array
    empleados.push({ nombre, sueldos });

    // Calcular total pagado y el empleado con mayor ingreso
    let totalPagado = 0;
    let maxIngreso = 0;
    let empleadoMayorIngreso = '';

    empleados.forEach(empleado => {
        const ingresoAcumulado = empleado.sueldos.reduce((a, b) => a + b, 0);
        totalPagado += ingresoAcumulado;

        if (ingresoAcumulado > maxIngreso) {
            maxIngreso = ingresoAcumulado;
            empleadoMayorIngreso = empleado.nombre;
        }
    });

    res.json({
        message: 'Empleado agregado correctamente.',
        totalPagado,
        empleadoMayorIngreso,
    });
});

