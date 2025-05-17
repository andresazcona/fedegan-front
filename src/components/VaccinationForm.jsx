import { useState } from 'react';
import {
  Paper, Typography, TextField, Button, Box
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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const payload = {
      ...formData,
      idVacunador: parseInt(localStorage.getItem('idVacunador')) // o gestionado desde /perfil
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
        <TextField label="Campaña" name="campaign" value={formData.campaign} onChange={handleChange} />
        <TextField label="Fecha" name="fecha" type="datetime-local" value={formData.fecha} onChange={handleChange} InputLabelProps={{ shrink: true }} />
        <TextField label="Tipo de Vacuna" name="tipoVacuna" value={formData.tipoVacuna} onChange={handleChange} />
        <TextField label="Observaciones" name="observaciones" value={formData.observaciones} onChange={handleChange} multiline rows={3} />
        <Button variant="contained" onClick={handleSubmit}>Registrar</Button>
      </Box>
    </Paper>
  );
}
