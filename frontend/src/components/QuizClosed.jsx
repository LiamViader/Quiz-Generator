import React from "react";
import { Box, CircularProgress, Typography, Menu, MenuItem, IconButton } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";

function QuizClosed({quiz}){
    // Estado para manejar la apertura/cierre del menú
    const [anchorEl, setAnchorEl] = useState(null);
    
    // Opciones del menú
    const options = [
        { id: 1, label: 'Chan' },
        { id: 2, label: 'Option 2' },
        { id: 3, label: 'Option 3' }
    ];

    // Función para abrir el menú
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Función para cerrar el menú
    const handleClose = () => {
        setAnchorEl(null);
    };

    // Función para manejar la selección de una opción
    const handleMenuItemClick = (option) => {
        console.log('Selected:', option.label);
        // Lógica adicional aquí (actualizar estado, hacer una solicitud, etc.)
        handleClose();
    };

    return(
        <Box
        mx='0.2rem'
        display="flex"
        alignItems="center"
        gap='0.2rem'
        py='0.5rem'
        pl='0.6rem'
        sx={{boxShadow:'2px 2px 2px gray', borderRadius: '1.1rem', backgroundColor:'#051923', color:'white', flex: '1 1 auto', marginRight: '2%', marginTop:'2%', maxWidth: quiz.loading ? '5rem' : '12rem', maxHeight:'1.5rem', overflow: 'hidden'}}
      >
        {quiz.loading ? 
            <div style={{paddingRight:'0.5rem', width:'2rem'}}>
                <CircularProgress size='1.3rem' sx={{color:'white'}} />
            </div>
            
            :
            <div style={{display: 'flex', overflow: 'hidden', width:'100%'}}>
                <div style={{ display:'flex', overflow: 'hidden', marginTop:'auto', marginBottom:'auto'}}>
                    <QuizIcon sx={{color: '#7fffd4',  }} />
                </div>
                <div style={{ flex: '2', display: 'flex', alignItems:'center', overflow: 'hidden', marginLeft:'0.3rem'}}>
                    <Typography sx={{flexGrow:'1', fontWeight: 'bold', fontSize:'0.8rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}> {quiz.quiz.name}</Typography>
                </div>
                <div style={{display:'flex', justifyContent: 'flex-end', marginLeft:'auto', alignItems:'left', overflow: 'hidden'}}>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClick}
                        endIcon={<ArrowDropDownIcon />}
                        sx={{marginLeft:'auto'}}
                    >
                        <MoreVertIcon sx={{color:'white', marginLeft:'auto'}}/>
                    </IconButton>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handlePrivacy()}>{quiz.quiz.privacy=="private"? "Make Public" : "Make Private"}</MenuItem>
                        <MenuItem onClick={() => handleRemove()}>Remove</MenuItem>
                        {quiz.quiz.solved && <MenuItem onClick={() => handleUnsolve()}>UnSolve</MenuItem>}
                    </Menu>
                </div>
            </div>
        }
      </Box>
    );
}

export default QuizClosed