import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, TextField, IconButton } from '@mui/material';
import ChangeIcon from '@mui/icons-material/ChangeCircle';
import axios from 'axios';

function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend
    const example_topics=["Rick & Morty", "klk", "hola"];

    const [data, setData] = useState(null);
    const [topicInput, setTopicInput] = useState("");
    const [exampleTopicIndex, setExampleTopicIndex] = useState(0);
    useEffect(() => {
        axios.get(`${backendUrl}`) 
          .then(response => setData(response.data))
          .catch(error => console.error('Error:', error));
    }, [backendUrl]);
    
    const handleSubmit = (event) =>{

    }

    const randomTopic = (event) =>{
        setExampleTopicIndex(prevIndex => {
            let newIndex = -1;
            if(prevIndex+1<example_topics.length)  newIndex=prevIndex+1;
            else newIndex=0;
            return newIndex;
          });
        setTopicInput(example_topics[exampleTopicIndex]);
    }

    return (
        <>      
            <ResponsiveAppBar/>
            <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold', marginTop: '4rem', color:'#2b2d42'  }}>
                Automatic quiz generator 
            </Typography>
            <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.5rem', marginTop: '0.8rem', color:'#2b2d42' }}>
                Generate a quiz from a given topic or explanation on what the quiz should be about
            </Typography>
            <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem',marginTop: '0.5rem', color:'#999999' }}>
                Quizzes are generated using gpt-3.5. The generated correct answers have an accuracy of 98.5%
            </Typography>
            <form onSubmit={handleSubmit} style={{marginLeft:'auto', marginRight:'auto', marginTop: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <TextField value={topicInput} sx={{flex: '1',marginRight:'1rem', backgroundColor: 'white'}} fullWidth id="quizGenInput" label="Your Topic" variant="outlined" required placeholder="e.g Cloud computing and distributed systems" InputLabelProps={{ shrink: true }} inputProps={{ maxLength: 50 }}/>
                    <div style={{ flex: '0 0 auto', display: 'block'}}>
                        <IconButton onClick={randomTopic} aria-label="reroll" color="secondary" sx={{position: 'relative', top: '7px', left: '1px'}}>
                            <ChangeIcon />
                        </IconButton>
                        <Typography textAlign="center" variant="h2" sx={{ fontSize: '10px', marginTop: '0.8rem', color:'#2b2d42', position: 'relative', top: '-8px', left: '-6px' }}>
                           example topic
                        </Typography>
                    </div>
                </div>
            </form>
            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
        </>
    )
}

export default Home