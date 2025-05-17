import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function RegistroForm() {
  const [form, setForm] = useState({ nombre: '', email: '', contraseña: '', rol: 'admin' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8080/registro', form);
      alert('Usuario registrado');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} />
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
      <TextField label="Contraseña" name="contraseña" type="password" value={form.contraseña} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit}>Registrarse</Button>
    </Box>
  );
}
