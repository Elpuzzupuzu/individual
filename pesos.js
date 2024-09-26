document.addEventListener('DOMContentLoaded', () => {
    let count = 0; // Contador para los pesos ingresados

    document.getElementById('pesoForm').addEventListener('submit', async function (e) {
        e.preventDefault(); // Evitar el comportamiento por defecto del formulario

        // Obtener el valor ingresado y convertirlo a un número
        const pesoInput = document.getElementById('pesoInput').value;
        const peso = parseFloat(pesoInput.trim()); // Convertir a número real

        // Validar que el peso es un número y es un número finito
        if (isNaN(peso) || !isFinite(peso)) {
            alert('El peso debe ser un número válido.');
            return;
        }

        // Validar que se ingresen solo números enteros o decimales
        if (peso < 0) {
            alert('El peso debe ser un número positivo.');
            return;
        }

        try {
            // Hacer la solicitud POST al servidor
            const response = await fetch('http://localhost:3000/pesos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ pesoEntrante: peso })
            });

            const data = await response.json();

            // Mostrar el resultado en el HTML si se han ingresado 10 pesos
            if (data.promedio !== undefined) {
                document.getElementById('result').textContent = 
                    `Promedio: ${data.promedio.toFixed(2)}, Mayores que el promedio: ${data.mayoresQuePromedio}, Menores que el promedio: ${data.menoresQuePromedio}`;
                count = 0; // Reiniciar el contador después de mostrar resultados
            } else {
                // Informar que el peso se ha almacenado y cuántos quedan por ingresar
                count++;
                alert(`Peso almacenado. Te quedan ${10 - count} pesos por ingresar.`);
            }

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error al almacenar el peso';
        }

        // Limpiar el campo de entrada
        document.getElementById('pesoInput').value = '';
    });
});
