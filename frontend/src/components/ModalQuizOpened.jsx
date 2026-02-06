import React, { useRef } from 'react';
import { Modal, Box, IconButton, Typography, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizOpened from './QuizOpened';

function ModalQuizOpened({ onQuizSolved, onCloseModal, quiz, onAnswerChange }) {
  const modalContentRef = useRef(null);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', md: '45rem' },
    bgcolor: '#0a1a23', // Una mica més clar que el fons total
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    borderRadius: 4,
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    border: '1px solid rgba(127, 255, 212, 0.1)', // Borde de color menta molt subtil
  };

  return (
    <Modal
      open={true}
      onClose={onCloseModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500, sx: { backdropFilter: 'blur(4px)' } } }}
    >
      <Fade in={true}>
        <Box sx={style}>
          {/* Header */}
          <Box sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #051923, #0a1a23)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            position: 'sticky',
            top: 0,
            zIndex: 10
          }}>
            <QuizIcon sx={{ fontSize: '2rem', mr: 2, color: '#7fffd4' }} />
            <Typography variant="h5" sx={{
              fontFamily: 'monospace',
              fontWeight: 800,
              color: '#7fffd4',
              flexGrow: 1,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              {quiz.name}
            </Typography>
            <IconButton onClick={onCloseModal} sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: '#7fffd4' } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Content */}
          <Box ref={modalContentRef} sx={{ overflowY: 'auto', p: 0 }}>
            <QuizOpened
              onSolved={(id) => {
                modalContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
                onQuizSolved(id);
              }}
              quiz={quiz}
              onAnswerChange={onAnswerChange}
            />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalQuizOpened;