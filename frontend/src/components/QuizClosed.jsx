import React from "react";
import { Box, CircularProgress, Typography } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';

function QuizClosed({quiz}){


    return(
        <Box
        mx='0.2rem'
        display="flex"
        alignItems="center"
        gap='0.2rem'
        p='0.5rem'
        px='0.8rem'
        sx={{ borderRadius: '1.1rem', backgroundColor:'#051923', color:'white', flex: '1 1 auto', marginRight: '2%', marginTop:'2%', maxWidth: quiz.loading ? '5rem' : '12rem', maxHeight:'1.5rem', overflow: 'hidden'}}
      >
        {quiz.loading ? 
            <CircularProgress size='1.3rem' sx={{color:'white'}} />
            :
            <div style={{display: 'flex', overflow: 'hidden'}}>
                <div style={{ display:'flex', overflow: 'hidden', marginTop:'auto', marginBottom:'auto'}}>
                    <QuizIcon sx={{color: '#7fffd4',  }} />
                </div>
                <div style={{ flex: '1', display: 'flex', alignItems:'center', overflow: 'hidden', marginLeft:'0.3rem'}}>
                    <Typography sx={{flexGrow:'1', fontWeight: 'bold', fontSize:'0.8rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}> {quiz.quiz.name}</Typography>
                </div>
                <div style={{ flex: '1', display: 'flex', alignItems:'center', overflow: 'hidden', marginLeft:'0.3rem'}}>
                    <Typography sx={{flexGrow:'1', fontWeight: 'bold', fontSize:'0.8rem', overflow:'hidden', textOverflow:'ellipsis', whiteSpace: 'nowrap'}}> {quiz.quiz.name}</Typography>
                </div>
            </div>
        }
      </Box>
    );
}

export default QuizClosed