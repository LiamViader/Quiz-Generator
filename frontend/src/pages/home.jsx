import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography} from '@mui/material';
import axios from 'axios';
import FormQuizGenerator from '../components/FormQuizGen';

function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend


    const [data, setData] = useState(null);


    useEffect(() => {
        axios.get(`${backendUrl}`) 
          .then(response => setData(response.data))
          .catch(error => console.error('Error:', error));
    }, [backendUrl]);
    


    return (
        <>  
            <ResponsiveAppBar/>
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold',  color:'#2b2d42'  }}>
                    Automatic quiz generator 
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.5rem', marginTop: '0.8rem', color:'#2b2d42' }}>
                    Generate a quiz from a given topic or explanation
                </Typography>
                <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem',marginTop: '0.5rem', color:'#999999' }}>
                    Quizzes are generated using gpt-4
                </Typography>
                <FormQuizGenerator/>
            </div>  

            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
        </>
    )
}

export default Home