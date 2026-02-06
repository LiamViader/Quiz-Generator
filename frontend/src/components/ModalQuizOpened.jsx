import React, { useRef } from 'react';
import { Modal, Box, IconButton, Typography, Fade, Backdrop } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizOpened from './QuizOpened';

function ModalQuizOpened({ onQuizSolved, onCloseModal, quiz, onAnswerChange }) {
  const modalContentRef = useRef(null);

  const handleSolved = (quizId) => {
    modalContentRef.current.scrollTo({ top: 0, behavior: "smooth" });
    onQuizSolved(quizId);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '95vw', md: '42rem' },
    bgcolor: '#051923',
    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
    borderRadius: 4,
    maxHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    outline: 'none',
    border: '1px solid rgba(127, 255, 212, 0.1)',
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
          <Box sx={{ p: 2.5, display: 'flex', alignItems: 'center', position: 'relative' }}>
            <QuizIcon sx={{ fontSize: '1.8rem', mr: 2, color: '#7fffd4' }} />
            <Typography variant="h6" sx={{
              fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem', color: '#7fffd4',
              fontSize: { xs: '1rem', md: '1.3rem' }, textTransform: 'uppercase'
            }}>
              {quiz.name}
            </Typography>
            <IconButton onClick={onCloseModal} sx={{ position: 'absolute', right: 8, top: 8, color: 'white', '&:hover': { color: '#7fffd4' } }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Box ref={modalContentRef} sx={{ overflowY: 'auto', bgcolor: 'background.paper', borderRadius: '0 0 16px 16px' }}>
            <QuizOpened onSolved={handleSolved} quiz={quiz} onAnswerChange={onAnswerChange} />
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
}

export default ModalQuizOpened;