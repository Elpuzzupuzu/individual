document.getElementById('sueldoForm').addEventListener('submit', async function (e) {
    e.preventDefault(); // Evitar el comportamiento por defecto del formulario

    const nombre = document.getElementById('nombreInput').value;
    const sueldosInput = document.getElementById('sueldoInput').value;

    // Convertir la entrada en un array de números
    const sueldos = sueldosInput.split(',').map(num => num.trim());

    // Verificar que todos los sueldos sean números válidos
    const valid = sueldos.every(sueldo => {
        const number = parseFloat(sueldo);
        return !isNaN(number) && number >= 0; // Aceptar solo números no negativos
    });

    if (!valid) {
        alert('Por favor, ingresa solo números enteros o decimales válidos (separados por comas).');
        return; // Salir de la función si hay un error
    }

    // Convertir los sueldos a números
    const sueldosNumericos = sueldos.map(Number);

    try {
        // Hacer la solicitud POST para agregar los sueldos y obtener el resumen
        const response = await fetch('http://localhost:3000/sueldos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, sueldos: sueldosNumericos })
        });

        const data = await response.json();
        alert(data.message);
        document.getElementById('resultado').textContent = `Total pagado en sueldos: $${data.totalPagado}. Empleado con mayor ingreso: ${data.empleadoMayorIngreso}.`;
        document.getElementById('sueldoForm').reset();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al agregar los sueldos');
    }
});
