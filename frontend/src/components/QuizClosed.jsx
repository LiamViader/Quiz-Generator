import React from "react";
import { Box, CircularProgress, Typography, Menu, MenuItem, IconButton, ButtonBase} from '@mui/material';
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

    const handleClickMenu = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClickQuiz = (event) => {
        console.log("clicat");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRemove = () =>{
        setAnchorEl(null);
    }

    const handlePrivacy = () =>{
        setAnchorEl(null);
    }

    const handleUnsolve = () =>{
        setAnchorEl(null);
    }

    return(
        <Box
        mx='0.2rem'
        display="flex"
        alignItems="center"
        gap='0.2rem'
        py='0.5rem'
        pl='0.6rem'
        sx={{boxShadow:'0px 2px 5px gray', borderRadius: '1.1rem', backgroundColor: quiz.quiz.solved ? '#9aaab1' : '#051923', color: 'white', flex: '1 1 auto', marginRight: '2%', marginTop:'2%', maxWidth: quiz.loading ? '5rem' : '12rem', maxHeight:'1.5rem', overflow: 'hidden'}}
      >
        {quiz.loading ? 
            <div style={{paddingRight:'0.5rem', width:'2rem'}}>
                <CircularProgress size='1.3rem' sx={{color:'white'}} />
            </div>
            
            :
            <div style={{display: 'flex', overflow: 'hidden', width:'100%'}}>
                <ButtonBase onClick={handleClickQuiz} sx={{display:'flex', flexGrow:'1',overflow: 'hidden'}}>
                    <div style={{ display:'flex', overflow: 'hidden', marginTop:'auto', marginBottom:'auto'}}>
                        <QuizIcon sx={{color: quiz.quiz.solved ? 'white' : '#7fffd4',  }} />
                    </div>
                    <div style={{ flex: '2', display: 'flex', alignItems:'center', overflow: 'hidden', marginLeft:'0.3rem'}}>
                        <Typography sx={{flexGrow:'1', fontWeight: 'bold', fontSize:'0.8rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}> {quiz.quiz.name}</Typography>
                    </div>
                </ButtonBase>

                <div style={{display:'flex', justifyContent: 'flex-end', marginLeft:'auto', alignItems:'left', overflow: 'hidden'}}>
                    <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        onClick={handleClickMenu}
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