import { Box, TextField, Button, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import loginImage from '../assets/login-image.png';
import logo from '../assets/logo.png';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      // Usar URL directa para pruebas
      const res = await axios.post('http://localhost:8080/auth/login', form, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Respuesta:', res.data); // Para depuración
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error de autenticación:', err);
      alert('Credenciales inválidas');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
      }}
    >
      {/* Imagen de fondo a pantalla completa */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
        }}
      >
        <img 
          src={loginImage} 
          alt="Background" 
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover' 
          }} 
        />
      </Box>

      {/* Formulario de login */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 4,
        }}
      >
        <Paper elevation={6} sx={{ p: 4, width: '100%', maxWidth: 400, borderRadius: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 2 }}>
            <img src={logo} alt="Logo" style={{ height: 50 }} />
          </Box>
          <Typography variant="h5" gutterBottom>
            Inicia Sesion en VacunEX
          </Typography>
          <TextField
            fullWidth
            label="Correo Electrónico"
            margin="normal"
            name="email"
            value={form.email}
            onChange={handleChange}
            sx={{
                '& label.Mui-focused': {
                color: '#5D9C00',
                },
                '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#5D9C00',
                },
                },
            }}
            />
            <TextField
            fullWidth
            label="Contraseña"
            type="password"
            margin="normal"
            name="password"
            value={form.password}
            onChange={handleChange}
            sx={{
                '& label.Mui-focused': {
                color: '#5D9C00',
                },
                '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: '#5D9C00',
                },
                },
            }}
            />

          <Button 
            fullWidth 
            variant="contained" 
            sx={{ 
                mt: 2, 
                backgroundColor: '#71BE00', 
                '&:hover': {
                backgroundColor: '#5D9C00',
                }
            }} 
            onClick={handleSubmit}
          >
            Iniciar Sesión
          </Button>
          
          {/* Mensaje legal */}
          <Typography 
            variant="caption" 
            color="text.secondary" 
            align="center" 
            sx={{ mt: 2, display: 'block', fontSize: '0.75rem' }}
          >
            Al iniciar sesión, aceptas nuestros Términos de Servicio y Política de Privacidad. 
            VacunEX almacenará y procesará tus datos de acuerdo con la normativa vigente de protección de datos.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}