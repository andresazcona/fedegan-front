import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Typography
} from '@mui/material';

export default function VaccinationTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchVacunaciones = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:8080/vacunaciones/vacunaciones', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRows(res.data);
    };

    fetchVacunaciones();
  }, []);

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Registro de Vacunaciones
      </Typography>
      <TableContainer sx={{ maxHeight: 400, overflowY: 'auto' }}>
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Finca</TableCell>
              <TableCell>Campaña</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Observaciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, i) => (
              <TableRow key={i}>
                <TableCell>{new Date(row.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{row.finca}</TableCell>
                <TableCell>{row.campaign}</TableCell>
                <TableCell>{row.tipoVacuna}</TableCell>
                <TableCell>{row.observaciones}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
