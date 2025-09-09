import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button,
  TextField, Box, Typography, IconButton, Alert, CircularProgress
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useCreateTranscript } from '../hooks/useCreateTranscript';
import Joi from 'joi'

interface CreateTranscriptModalProps {
  open: boolean;
  onClose: () => void;
}

const transcriptSchema = Joi.object({
  transcript: Joi.array()
    .items(
      Joi.object({
        ts: Joi.string().required(),
        speaker: Joi.string().required(),
        text: Joi.string().required(),
      })
    )
    .min(1)
    .required()
    .messages({
      'object.base': 'El JSON debe ser un objeto con una clave "transcript".',
      'any.required': 'El campo "transcript" es requerido.',
      'array.base': 'El campo "transcript" debe ser un arreglo.',
      'array.min': 'La transcripción debe contener al menos una entrada.',
      'array.includesRequiredUnknowns': 'Cada entrada en la transcripción debe tener los campos "ts", "speaker", y "text".'
    }),
});


const CreateTranscriptModal = ({ open, onClose }: CreateTranscriptModalProps) => {
  const navigate = useNavigate();
  const [transcript, setTranscript] = useState('');
  const [localError, setLocalError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { createTranscript, isLoading, error: apiError } = useCreateTranscript();

  useEffect(() => {
    if (!open) {
      setTranscript('');
      setLocalError('');
      setSuccessMessage('');
    }
  }, [open]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setLocalError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const fileContent = event.target?.result as string;
        const parsedJson = JSON.parse(fileContent);
        setTranscript(JSON.stringify(parsedJson, null, 2));
      } catch (e) {
        setLocalError('El archivo no es un JSON válido.');
      }
    };
    reader.onerror = () => setLocalError('Error al leer el archivo.');
    reader.readAsText(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/json': ['.json'] },
    multiple: false,
  });


  const handleSubmit = async () => {
    let parsedData;
    setLocalError("");
    if (!transcript.trim()) {
      setLocalError("El campo de transcripción no puede estar vacío.");
      return;
    }
    try {
      parsedData = JSON.parse(transcript);
    } catch (e) {
      setLocalError("El contenido no es un JSON válido.");
      return;
    }


    const { error } = transcriptSchema.validate(parsedData);

    if (error) {

      setLocalError(`Formato de JSON incorrecto: ${error.details[0].message}`);
      return;
    }


    try {
      const analysisId = await createTranscript(JSON.parse(transcript));
      setSuccessMessage("¡Análisis creado exitosamente!");

      setTimeout(() => {
        if (analysisId) {
          navigate(`/transcription/${analysisId}`);
        } else {
          navigate('/');
        }
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Error al crear transcript:', error);
    }
  };

  return (

    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        Crear Nuevo Análisis de Transcripción
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          {...getRootProps()}
          sx={{
            p: 3,
            border: `2px dashed ${isDragActive ? 'primary.main' : 'grey.400'}`,
            borderRadius: 2,
            backgroundColor: isDragActive ? 'action.hover' : 'transparent',
            textAlign: 'center',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.6 : 1,
            transition: 'border-color 0.3s, background-color 0.3s, opacity 0.3s',
          }}
        >
          <input {...getInputProps()} />
          <Typography color="text.secondary" gutterBottom>
            {isDragActive
              ? 'Suelta el archivo .json aquí...'
              : 'Arrastra tu archivo .json o haz clic para seleccionarlo'}
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={15}
            variant="outlined"
            placeholder='El contenido de tu archivo aparecerá aquí...'
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            disabled={isLoading}
          />
        </Box>


        {successMessage && (
          <Alert severity="success" sx={{ mt: 2 }}>
            {successMessage}
            <Typography variant="body2" sx={{ mt: 1 }}>
              Redirigiendo al análisis...
            </Typography>
          </Alert>
        )}

        {localError && <Alert severity="error" sx={{ mt: 2 }}>{localError}</Alert>}
        {apiError && <Alert severity="error" sx={{ mt: 2 }}>{apiError}</Alert>}

        {isLoading && !successMessage && (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <CircularProgress size={24} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              Creando análisis...
            </Typography>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={isLoading}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={isLoading || !transcript.trim() || !!successMessage}
          startIcon={isLoading ? <CircularProgress size={16} /> : null}
        >
          {successMessage ? 'Redirigiendo...' : isLoading ? 'Creando...' : 'Crear Análisis'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateTranscriptModal