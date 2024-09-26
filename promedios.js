// Objeto para llevar un conteo de las notas por curso
const notasPorCurso = {
    'Estructura de datos': [],
    'Desarrollo de Aplicaciones': [],
    'Ingeniería de Software': [],
    'Administración de Base de Datos': [],
    'Inglés IV': []
};

document.getElementById('notaForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const curso = document.getElementById('cursoInput').value;
    const nota = parseFloat(document.getElementById('notaInput').value);

    // Verificar si ya se han ingresado 5 notas para el curso seleccionado
    if (notasPorCurso[curso].length >= 5) {
        document.getElementById('result').textContent = `Ya has ingresado 5 notas para el curso ${curso}.`;
        return;
    }

    // Agregar la nota al curso correspondiente
    notasPorCurso[curso].push(nota);

    try {
        // Hacer la solicitud POST para agregar la nota
        const response = await fetch('http://localhost:3000/notas/agregar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ curso, nota })
        });

        const data = await response.json();

        // Mostrar resultado
        document.getElementById('result').textContent = data.message;

        // Calcular cuántas notas faltan por ingresar
        const notasFaltantes = 5 - notasPorCurso[curso].length;
        if (notasFaltantes > 0) {
            document.getElementById('result').textContent += ` Te faltan ${notasFaltantes} notas por agregar para el curso ${curso}.`;
        } else {
            document.getElementById('result').textContent += ` Has ingresado todas las notas para el curso ${curso}.`;
        }

        // Limpiar el formulario
        document.getElementById('notaForm').reset();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error al agregar la nota';
    }
});

document.getElementById('promedioButton').addEventListener('click', async function () {
    try {
        // Hacer la solicitud GET para obtener el curso con mayor promedio
        const response = await fetch('http://localhost:3000/notas/promedio');

        const data = await response.json();
        const cursos = data.cursos.join(', ');
        const promedio = data.promedio;

        // Mostrar resultado
        document.getElementById('promedioResult').textContent = `Curso(s) con mayor promedio: ${cursos} (Promedio: ${promedio.toFixed(2)})`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('promedioResult').textContent = 'Error al obtener el promedio';
    }
});
