// src/components/MyVaccinationsTable.jsx
import { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import axios from 'axios';

export default function MyVaccinationsTable() {
  const [vacunaciones, setVacunaciones] = useState([]);

  const fetchMyVaccines = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:8080/vacunaciones/mis-vacunaciones', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setVacunaciones(res.data);
  };

  useEffect(() => {
    fetchMyVaccines();
  }, []);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Mis Vacunaciones</Typography>
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Finca</TableCell>
              <TableCell>Campaña</TableCell>
              <TableCell>Fecha</TableCell>
              <TableCell>Tipo Vacuna</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vacunaciones.map((v, i) => (
              <TableRow key={i}>
                <TableCell>{v.finca}</TableCell>
                <TableCell>{v.campaign}</TableCell>
                <TableCell>{new Date(v.fecha).toLocaleString()}</TableCell>
                <TableCell>{v.tipoVacuna}</TableCell>
                <TableCell>{v.observaciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
