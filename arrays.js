document.getElementById('arrayForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Obtener el valor ingresado y convertirlo en un arreglo
    const arrayInput = document.getElementById('arrayInput').value;
    const array = arrayInput.split(',').map(item => item.trim()); // Convertir en un arreglo y eliminar espacios

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('http://localhost:3000/array/invert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ array })
        });

        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        // Mostrar el resultado en el HTML
        document.getElementById('result').textContent = `Arreglo invertido: ${data.invertedArray.join(', ')}`;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error al invertir el arreglo';
    }
});
