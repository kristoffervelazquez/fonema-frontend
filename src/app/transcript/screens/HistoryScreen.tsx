
import {
  Container, Typography, Box, CircularProgress, Alert, Chip, Button,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import useSWR from 'swr';
import TranscriptApi from '../../../api/transcript/transcript';
import { useNavigate } from 'react-router-dom';


const HistoryScreen = () => {
  const navigate = useNavigate()
  const { data: response, isLoading, error } = useSWR('/api/transcript', () => TranscriptApi.getAll());
  const transcripts = response?.data;

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'created_at',
      headerName: 'Fecha de Análisis',
      width: 180,
      valueFormatter: (value: any) => new Date(value).toLocaleDateString('es-MX'),
    },
    {
      field: 'sentiment',
      headerName: 'Sentimiento',
      width: 150,
      renderCell: (params) => {
        const sentiment = params.row.sentiment.score;
        let color: "success" | "error" | "warning" = "warning";
        if (sentiment === 'Positivo') color = 'success';
        if (sentiment === 'Negativo') color = 'error';
        return <Chip label={sentiment} color={color} variant="outlined" />;
      },
    },
    {
      field: 'summary',
      headerName: 'Resumen Ejecutivo',
      flex: 1,
      minWidth: 300,
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate(`/transcription/${params.row.id}`)}
        >
          Ver Detalles
        </Button>
      )
    }
  ];

  if (isLoading) {
    return <Box display="flex" justifyContent="center" mt={5}><CircularProgress /></Box>;
  }

  if (error) {
    return <Alert severity="error">Error al cargar el historial: {error.message}</Alert>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Historial de Análisis
      </Typography>
      <Box sx={{ height: '70vh', width: '100%' }}>
        <DataGrid
          rows={transcripts || []}
          columns={columns}
          loading={isLoading}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
            sorting: { sortModel: [{ field: 'created_at', sort: 'desc' }] },
          }}
          pageSizeOptions={[5, 10, 25]}
          disableRowSelectionOnClick
        />
      </Box>

    </Container>
  );
};

export default HistoryScreen;
