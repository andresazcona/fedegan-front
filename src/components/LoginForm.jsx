import { TextField, Button, Box } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async () => {
    try {
      const res = await axios.post('http://localhost:8080/auth/login', form);
      localStorage.setItem('token', res.data.token); // Guardar JWT
      navigate('/dashboard');
    } catch (error) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField label="Email" name="email" value={form.email} onChange={handleChange} />
      <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
      <Button variant="contained" onClick={handleSubmit}>Iniciar sesión</Button>
    </Box>
  );
}
