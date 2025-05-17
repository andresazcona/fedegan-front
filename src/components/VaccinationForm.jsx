import { useState } from 'react';
import {
  Paper, Typography, TextField, Button, Box, MenuItem
} from '@mui/material';
import axios from 'axios';

export default function VaccinationForm() {
  const [formData, setFormData] = useState({
    finca: '',
    campaign: '',
    fecha: '',
    tipoVacuna: '',
    observaciones: ''
  });

  const tiposVacuna = [
    'Vacuna contra aftosa',
    'Vacuna contra brucelosis',
    'Vacuna contra rabia',
    'Vacuna multivalente',
    'Vacuna de refuerzo general'
  ];

  const campañas = [
    'Campaña 2025',
    'Campaña Sanidad Rural',
    'Campaña Verano Saludable',
    'Campaña Ganadera Nacional',
    'Campaña Protege tu Hato'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      idVacunador: parseInt(localStorage.getItem('idVacunador'))
    };

    await axios.post('http://localhost:8080/vacunaciones', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    alert('Vacunación registrada correctamente');
    setFormData({ finca: '', campaign: '', fecha: '', tipoVacuna: '', observaciones: '' });
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>Registrar Vacunación</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Finca" name="finca" value={formData.finca} onChange={handleChange} />
        
        <TextField
          label="Campaña"
          name="campaign"
          select
          value={formData.campaign}
          onChange={handleChange}
        >
          {campañas.map((campaña, i) => (
            <MenuItem key={i} value={campaña}>
              {campaña}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Fecha"
          name="fecha"
          type="datetime-local"
          value={formData.fecha}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />

        <TextField
          label="Tipo de Vacuna"
          name="tipoVacuna"
          select
          value={formData.tipoVacuna}
          onChange={handleChange}
        >
          {tiposVacuna.map((tipo, i) => (
            <MenuItem key={i} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Observaciones"
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <Button variant="contained" onClick={handleSubmit}>Registrar</Button>
      </Box>
    </Paper>
  );
}
