import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import {
  Container, Typography, Box, CircularProgress, Alert, Card, CardContent,
  Chip, List, ListItem, ListItemText, Divider,
  Paper

} from '@mui/material';
import TranscriptApi from '../../../api/transcript/transcript';
import {
  Timeline, TimelineSeparator, TimelineConnector,
  TimelineContent, TimelineDot, TimelineOppositeContent,
} from '@mui/lab';
import { useMemo } from 'react';
import { Person } from '@mui/icons-material';



const AnalysisScreen = () => {
  const { id } = useParams<{ id: string }>();

  const { data: response, isLoading, error } = useSWR(
    id ? `/api/transcript/${id}` : null,
    () => TranscriptApi.getById(id!)
  );
  const analysis = response?.data;
  const originalTranscript = useMemo(() => {
    if (!analysis?.original_json) return [];

    try {

      if (typeof analysis.original_json === 'object') {
        return Array.isArray(analysis.original_json) ? analysis.original_json : [];
      }


      if (typeof analysis.original_json === 'string') {
        const parsed = JSON.parse(analysis.original_json);
        return Array.isArray(parsed) ? parsed : [];
      }

      return [];
    } catch (e) {
      console.error("Failed to parse original_json:", e);
      console.error("original_json value:", analysis.original_json);
      console.error("original_json type:", typeof analysis.original_json);
      return [];
    }
  }, [analysis])
  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" mt={5}>
          <CircularProgress />
        </Box>
      </Container>
    );

  }



  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">
          Error al cargar el análisis: {error.message}
        </Alert>
      </Container>
    );

  }



  if (!analysis) {

    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Análisis no encontrado
        </Alert>
      </Container>
    );

  }



  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Análisis de Transcripción #{analysis.id}
      </Typography>


      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Información General
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 2 }}>
            <Chip
              label={`Sentimiento: ${analysis.sentiment?.score || 'N/A'}`}
              color={analysis.sentiment?.score === 'Positivo' ? 'success' :
                analysis.sentiment?.score === 'Negativo' ? 'error' : 'default'}
            />
            <Chip
              label={`Creado: ${analysis.created_at ? new Date(analysis.created_at).toLocaleDateString('es-MX') : 'N/A'}`}
              variant="outlined"
            />
          </Box>

          {analysis.sentiment?.reason && (
            <Typography variant="body2" color="text.secondary">
              <strong>Razón del sentimiento:</strong> {analysis.sentiment.reason}
            </Typography>
          )}
        </CardContent>
      </Card>



      {analysis.summary && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Resumen
            </Typography>
            <Typography variant="body1">
              {analysis.summary}
            </Typography>
          </CardContent>
        </Card>

      )}

      {analysis.action_items && analysis.action_items.length > 0 && (
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Elementos de Acción
            </Typography>
            <List>
              {analysis.action_items.map((item, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="body1">{item.task}</Typography>
                          <Chip
                            label={item.owner}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={`Timestamp: ${item.ts}`}
                    />
                  </ListItem>
                  {index < analysis.action_items!.length - 1 && <Divider />}
                </div>
              ))}
            </List>
          </CardContent>
        </Card>

      )}


      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Transcripción Original
          </Typography>
          {originalTranscript.length > 0 ? (
            <Timeline position="right">
              {originalTranscript.map((item: any, index: number) => (
                <Timeline key={index}>
                  <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.ts}
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={item.speaker === 'Agente' ? 'primary' : 'grey'}>
                      <Person />

                    </TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Paper elevation={3} sx={{ p: 2 }}>
                      <Typography variant="h6" component="h1">
                        {item.speaker}
                      </Typography>
                      <Typography>{item.text}</Typography>
                    </Paper>
                  </TimelineContent>
                </Timeline>
              ))}
            </Timeline>
          ) : (
            <Typography color="text.secondary">No se encontró la transcripción original.</Typography>
          )}
        </CardContent>
      </Card>
    </Container>

  );

};



export default AnalysisScreen;


