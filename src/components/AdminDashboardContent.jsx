import {
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import VaccinationChart from './VaccinationChart';
import VaccinationTable from './VaccinationTable';

export default function AdminDashboardContent() {
  const [totalVacunaciones, setTotalVacunaciones] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({ nombre: '', email: '', contraseña: '', rol: 'vacunador' });
  const [vacunadores, setVacunadores] = useState([]);

  const fetchTotalVacunaciones = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/vacunaciones/vacunaciones', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setTotalVacunaciones(res.data.length);
  };

  const fetchVacunadores = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/usuarios', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const soloVacunadores = res.data.filter(user => user.rol === 'vacunador');
    setVacunadores(soloVacunadores);
  };

  const handleRegisterVaccinator = async () => {
    const token = localStorage.getItem('token');
    await axios.post('http://localhost:8080/registro', formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setOpenDialog(false);
    setFormData({ nombre: '', email: '', contraseña: '', rol: 'vacunador' });
    fetchVacunadores();
  };

  useEffect(() => {
    fetchTotalVacunaciones();
    fetchVacunadores();
  }, []);

  return (
    <>
      {/* Bloque superior: ocupa 100% del ancho */}
      <Grid container spacing={3} sx={{ mb: 10 }}>
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Typography variant="subtitle2" align="center">Número de vacunaciones realizadas</Typography>
            <Typography variant="h3" color="primary" align="center">{totalVacunaciones}</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 2, height: '100%' }}>
            <VaccinationChart />
          </Paper>
        </Grid>
      </Grid>

      {/* Bloque inferior */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <VaccinationTable />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={0} sx={{ p: 2 }}>
            <Grid container alignItems="center" sx={{ mb: 4 }}>
              <Grid item sx={{ mr: 4 }}>
                <Typography variant="h6">Lista de Vacunadores</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => setOpenDialog(true)}>
                  Registrar
                </Button>
              </Grid>
            </Grid>
            <ul>
              {vacunadores.map(v => (
                <li key={v.id}>{v.nombre} - {v.email}</li>
              ))}
            </ul>
          </Paper>
        </Grid>
      </Grid>

      {/* Popup */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Registrar Vacunador</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="Nombre" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} />
          <TextField label="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <TextField label="Contraseña" type="password" value={formData.contraseña} onChange={e => setFormData({ ...formData, contraseña: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button onClick={handleRegisterVaccinator} variant="contained">Registrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
