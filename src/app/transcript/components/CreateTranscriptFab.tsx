import { useState } from 'react';
import { Fab, Typography } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import CreateTranscriptModal from './CreateTranscriptModal';

const CreateTranscriptFab = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Fab
        color="primary"
        aria-label="crear transcript"
        onClick={handleOpenModal}
        sx={{
          position: 'fixed',
          top: { xs: 100, sm: 32, md: 48 },
          right: { xs: 16, sm: 32, md: 48 },
          zIndex: 1000,
          minWidth: { xs: 180, sm: 220, md: 260 },
          height: { xs: 56, sm: 64, md: 72 },
          borderRadius: { xs: 4, sm: 6, md: 8 },
          boxShadow: { xs: 4, md: 10 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          fontWeight: 'bold',
          fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' }
        }}
        variant="extended"
      >
        <AddIcon sx={{ mr: 1, fontSize: { xs: 24, sm: 28, md: 32 } }} />
        <Typography sx={{ fontWeight: 700, whiteSpace: 'nowrap' }}>
          Nueva Transcripción
        </Typography>
      </Fab>

      <CreateTranscriptModal
        open={openModal}
        onClose={handleCloseModal}
      />
    </>
  );
};

export default CreateTranscriptFab;
