import React from 'react';
import ResponsiveAppBar from '../ResponsiveAppBar';
import { Typography } from '@mui/material';
import { FileUploader } from "react-drag-drop-files";
import DropStyled from '../DropStyled';

function Home(){
    return (
        <>      
            <ResponsiveAppBar/>
            <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold', marginTop: '2.7rem', color:'#2b2d42'  }}>
                Quiz generator from PDF
            </Typography>
            <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.5rem', marginTop: '0.8rem', color:'#2b2d42' }}>
                Drop a PDF file containing information on a topic you want to generate a quiz from.
            </Typography>
            <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem',marginTop: '0.3rem', color:'#999999' }}>
                Quizzes are generated using gpt-3.5. The generated correct answers have an accuracy of 98.5%
            </Typography>
            <FileUploader children={<DropStyled/>}/>
        </>
    )
}

export default Home