import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Box,
  Container,
  Divider,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/AccountCircle';
import { useState, useEffect } from 'react';
import { useAuth } from '../utils/auth';
import axios from 'axios';
import logo from '../assets/logo.png';
import AdminDashboardContent from '../components/AdminDashboardContent';

export default function Dashboard() {
  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [perfil, setPerfil] = useState({ nombre: '', email: '', rol: '' });

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  const fetchProfile = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/perfil', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setPerfil({
      nombre: res.data.nombre || 'Administrador',
      email: res.data.email || '',
      rol: res.data.rol || '',
    });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* HEADER */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          backgroundColor: '#ffffff',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          zIndex: 10,
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <img src={logo} alt="Logo" style={{ height: 40, marginRight: 20 }} />
            <Typography variant="h6" component="div" sx={{ color: '#000' }}>
              VacunEX Dashboard
            </Typography>
          </Box>

          <IconButton onClick={handleMenuOpen} size="large">
            <Avatar sx={{ bgcolor: '#5D9C00' }}>
              <MenuIcon />
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            sx={{ p: 2 }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {perfil.nombre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {perfil.email}
              </Typography>
              <Typography variant="caption" color="text.secondary" fontStyle="italic">
                Rol: {perfil.rol}
              </Typography>
            </Box>
            <Divider sx={{ my: 1 }} />
            <MenuItem>
              <Button fullWidth color="primary" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* CONTENIDO */}
      <Box sx={{ flex: 1, width: '100%', backgroundColor: '#f0f0f0', padding: 4 }}>
        <Container maxWidth="xl">
          <Typography variant="h4" gutterBottom>
            Bienvenido, {perfil.nombre}
          </Typography>
          <AdminDashboardContent />
        </Container>
      </Box>
    </Box>
  );
}
