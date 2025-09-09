import useSWR from 'swr';
import {
  Container, Typography, Box, CircularProgress, Alert,
} from '@mui/material';
import TranscriptApi from '../../../api/transcript/transcript';
import { useDashboardStats } from '../hooks/useDashboardStats';
import { StatCard } from '../components/StatCard';
import SentimentPieChart from '../components/SentimentPieChart';
import SentimentTimeLineChart from '../components/SentimentTimeLineChart';
import CreateTranscriptFab from '../components/CreateTranscriptFab';


const Dashboard = () => {
  const { data: response, isLoading, error } = useSWR('/api/transcript', () => TranscriptApi.getAll());


  const transcripts = response?.data;

  const { total, sentimentCounts, pieData, timelineAxisData } = useDashboardStats(transcripts);


  if (isLoading) {
    return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">Error al cargar el dashboard: {error.message}</Alert>;
  }  

  return (
    <Container maxWidth="xl" sx={{ py: 4, position: 'relative' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard de Análisis
      </Typography>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
        gap: 3,
        mb: 3
      }}>
        <StatCard title="Total de Análisis" value={total} />
        <StatCard title="Llamadas Positivas" value={sentimentCounts.Positivo} color="success.main" />
        <StatCard title="Llamadas Negativas" value={sentimentCounts.Negativo} color="error.main" />
      </Box>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3
      }}>
        <SentimentPieChart pieData={pieData} />
        <SentimentTimeLineChart timelineAxisData={timelineAxisData} />

      </Box>

      <CreateTranscriptFab />
    </Container>
  );
};

export default Dashboard;