import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography } from '@mui/material';
import { FilePondComponent } from '../components/FilePondComponent';

import axios from 'axios';

function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend

    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(`${backendUrl}`) // Reemplaza "/api/endpoint" con tu endpoint real
          .then(response => setData(response.data))
          .catch(error => console.error('Error:', error));
      }, [backendUrl]);

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
            <div style={{ maxWidth: '40rem', margin: 'auto', marginTop: '2rem' }}>
                <FilePondComponent />
            </div>
            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
        </>
    )
}

export default Home