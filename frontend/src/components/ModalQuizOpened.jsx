import React, { useState, useEffect } from 'react';
import { Modal, Box, IconButton, Typography, Button, Fade } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import QuizIcon from '@mui/icons-material/Quiz';
import QuizOpened from './QuizOpened';
function ModalQuizOpened({onCloseModal, quiz}) {
  
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => onCloseModal(), 300);
    }
  }, [isOpen, onCloseModal]);

  const handleClose = () =>{
    setIsOpen(false);
  } 

  const style1 = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80vw',
    maxWidth: '40rem',
    bgcolor: '#051923',
    boxShadow: 24,
    borderRadius: 2, 
    maxHeight: '80vh',
    overflowY: 'auto',
    overflowWrap: 'break-word',
    wordBreak: 'break-all',
  };


  return (
    <div>
      <Modal open={isOpen} onClose={handleClose}>
        <Fade in={isOpen}>
          <Box sx={style1}>
            <div style={{display:'flex', alignItems:"center", padding:'1.2rem 2rem', overflowWrap: 'break-word', wordBreak: 'break-all'}}>
              <QuizIcon sx={{ fontSize:'1.8rem', mr: 2, color: '#7fffd4' }} />
              <Typography
                variant="h6"
                sx={{
                  mr: 4,
                  ml:1,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.3rem',
                  color: '#7fffd4',
                  textDecoration: 'none',
                  fontSize:'1.5rem'
                }}
              >
                {quiz.quiz.name}
              </Typography>
            </div>


            <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white',
                }}
              >
              <CloseIcon />
            </IconButton>
            <QuizOpened quiz={quiz}/>
            
          </Box>
        </Fade>
        
      </Modal>
    </div>
  );
}

export default ModalQuizOpened;