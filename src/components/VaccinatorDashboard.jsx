import { Container, Box } from '@mui/material';
import VaccinationForm from './VaccinationForm';
import MyVaccinationsTable from './MyVaccinationsTable';

export default function VaccinatorDashboard() {
  return (
    <Box sx={{ backgroundColor: '#f0f0f0', minHeight: '100vh', p: 4 }}>
      <Container maxWidth="xl">
        <VaccinationForm />
        <MyVaccinationsTable />
      </Container>
    </Box>
  );
}
