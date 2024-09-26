document.getElementById('nameForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    // Obtener el valor ingresado
    const nameInput = document.getElementById('nameInput').value.trim();

    try {
        // Hacer la solicitud POST al servidor
        const response = await fetch('http://localhost:3000/nombres/existe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre: nameInput })
        });

        // Comprobar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        // Mostrar el resultado en el HTML
        document.getElementById('result').textContent = data.existe 
            ? `El nombre "${nameInput}" existe en el arreglo.` 
            : `El nombre "${nameInput}" NO existe en el arreglo.`;

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('result').textContent = 'Error al verificar el nombre';
    }
});
