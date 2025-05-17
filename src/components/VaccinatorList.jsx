import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';

export default function VaccinatorList() {
  const [vacunadores, setVacunadores] = useState([]);

  const fetchVacunadores = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get('http://localhost:8080/usuarios', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const soloVacunadores = res.data.filter(user => user.rol === 'vacunador');
      setVacunadores(soloVacunadores);
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  };

  useEffect(() => {
    fetchVacunadores();
  }, []);

  if (vacunadores.length === 0) {
    return <Typography variant="body2">No hay vacunadores registrados aún.</Typography>;
  }

  return (
    <TableContainer component={Paper} elevation={1} sx={{ maxHeight: 400, overflowY: 'auto' }}>
      <Table size="small" stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Nombre</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vacunadores.map(v => (
            <TableRow key={v.id}>
              <TableCell>{v.id}</TableCell>
              <TableCell>{v.nombre}</TableCell>
              <TableCell>{v.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
