import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography} from '@mui/material';
import axios from 'axios';
import FormQuizGenerator from '../components/FormQuizGen';
import QuizListRenderer from '../components/QuizListRenderer';

function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend

    const exampleQuiz ={
        loading: true,
        quiz: {

        }
    }

    const exampleQuiz2 ={
        loading: false,
        quiz: {
            id: "12123eddsd",
            privacy: "private",
            name: "QUEPASAAAAAAAAAAAAAAAAAAAAA",
            solved: true
        }
    }

    const exampleQuiz3 ={
        loading: false,
        quiz: {
            id: "12123eddsd",
            privacy: "private",
            name: "Hola",
            solved: false
        }
    }

    const [closedQuizzes, setClosedQuizzes] = useState([exampleQuiz,exampleQuiz2, exampleQuiz3, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz]);

    const [data, setData] = useState(null);


    useEffect(() => {
        axios.get(`${backendUrl}`) 
          .then(response => setData(response.data))
          .catch(error => console.error('Error:', error));
    }, [backendUrl]);
    
    const handleFormSumitted = () => {
        console.log("submitted");
    }

    return (
        <>  
            <ResponsiveAppBar/>
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold',  color:'#2b2d42'  }}>
                    Automatic quiz generator 
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.1rem', marginTop: '0.3rem', color:'#2b2d42' }}>
                    Generate a quiz from a given topic or explanation
                </Typography>
                <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem', color:'#999999' }}>
                    Quizzes are generated using gpt-4
                </Typography>
                <FormQuizGenerator onSubmit={handleFormSumitted}/>

            </div>  
            <hr style={{ height: '1px', width: '60%', margin: '0 10px', marginLeft:'auto', marginRight:'auto' }} />
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 'bold',  color:'#2b2d42', marginTop: '1rem', marginBottom:'1rem'  }}>
                Generated Quizzes
                </Typography>
                <QuizListRenderer quizList={closedQuizzes}/>
            </div>

            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
        </>
    )
}

export default Home