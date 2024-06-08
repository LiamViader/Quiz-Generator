import React from "react";
import { Box, CircularProgress } from '@mui/material';


function QuizClosed({quiz}){


    return(
        <Box
        mx='0.2rem'
        display="flex"
        alignItems="center"
        gap='0.2rem'
        p='0.5rem'
        sx={{ borderRadius: '0.7rem', backgroundColor:'#051923', color:'white', flex: '1 1 auto', marginRight: '2%', marginTop:'2%', maxWidth:'8rem'}}
      >
        {quiz.loading ? 
            <CircularProgress size='1.1rem' sx={{color:'white'}} />
            :
            <CircularProgress size='1.1rem' sx={{color:'white'}}/>
        }
      </Box>
    );
}

export default QuizClosed