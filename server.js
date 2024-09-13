const express = require('express');
const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

// Ruta para obtener turnos
app.get('/api/turnos', (req, res) => {
    const filePath = path.join(__dirname, 'turnos.json');
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        res.json(JSON.parse(data));
    } else {
        res.json({ turnos: [] });
    }
});

// Ruta para crear un nuevo turno
app.post('/api/turnos', (req, res) => {
    const { nombre, cedula, estudio } = req.body;
    const filePath = path.join(__dirname, 'turnos.json');

    let turnos = [];
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath);
        turnos = JSON.parse(data).turnos;
    }

    // Crear el nuevo turno
    const tipoEstudio = estudio || 'General';
    const turnoActual = turnos.filter(turno => turno.estudio === tipoEstudio).length + 1;
    const turno = `Turno ${tipoEstudio} ${String(turnoActual).padStart(2, '0')}`;

    const nuevoTurno = { turno, nombre, cedula, estudio };
    turnos.push(nuevoTurno);

    // Guardar en JSON
    fs.writeFileSync(filePath, JSON.stringify({ turnos }, null, 2));

    // Guardar en Excel
    saveTurnosToExcel(turnos);

    res.status(201).json(nuevoTurno);
});

// Función para guardar turnos en un archivo Excel
function saveTurnosToExcel(turnos) {
    const ws = XLSX.utils.json_to_sheet(turnos);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Turnos');

    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, `turnos_${today}.xlsx`);

    // Guardar el archivo Excel
    XLSX.writeFile(wb, filePath);
}

// Ruta para descargar el archivo Excel
app.get('/api/download-excel', (req, res) => {
    const today = new Date().toISOString().split('T')[0];
    const filePath = path.join(__dirname, `turnos_${today}.xlsx`);

    if (fs.existsSync(filePath)) {
        res.download(filePath, `turnos_${today}.xlsx`);
    } else {
        res.status(404).send('Archivo no encontrado.');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
