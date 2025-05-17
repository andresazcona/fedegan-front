import { Box, Grid } from '@mui/material';
import VaccinationForm from './VaccinationForm';
import MyVaccinationsTable from './MyVaccinationsTable';

export default function VaccinatorDashboard() {
  return (
    <Box
      sx={{
        backgroundColor: '#f0f0f0',
        minHeight: '100vh',
        px: 4,
        py: 4,
        width: '100vw',
        boxSizing: 'border-box'
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <VaccinationForm />
        </Grid>
        <Grid item xs={12} md={7}>
          <MyVaccinationsTable />
        </Grid>
      </Grid>
    </Box>
  );
}
