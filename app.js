// Función para obtener la lista de turnos desde el servidor
async function obtenerTurnos() {
    try {
        const response = await fetch('/api/turnos');
        const data = await response.json();

        // Llenar dinámicamente las opciones del select
        const horaSelect = document.getElementById('hora');
        horaSelect.innerHTML = '';

        data.forEach(turno => {
            const option = document.createElement('option');
            option.value = turno.hora;
            option.text = turno.hora;
            horaSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error al obtener turnos:', error);
    }
}

// Función para solicitar un nuevo turno
async function solicitarTurno(turno) { }
try {
    const response = await fetch('/api/solicitar-turno', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ turno }),
    });

    const data = await response.json();

    // Mostrar mensaje de éxito o error
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.innerHTML = `<div class="alert alert-${data.error ? 'danger' : 'success'}" role="alert">${data.mensaje}</div>`;

    // Actualizar la lista de turnos después de la solicitud exitosa
    if (!data.error) {
        obtenerTurnos();
    }
}
catch (error) {
    console.error('Error al solicitar turno:', error);};