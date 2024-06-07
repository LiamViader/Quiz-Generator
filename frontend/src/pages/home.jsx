import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, TextField, IconButton, Slider, Grid } from '@mui/material';
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
            <div style={{paddingLeft:'1rem', paddingRight:'1rem'}}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold', marginTop: '4rem', color:'#2b2d42'  }}>
                    Automatic quiz generator 
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.5rem', marginTop: '0.8rem', color:'#2b2d42' }}>
                    Generate a quiz from a given topic or explanation on what the quiz should be about
                </Typography>
                <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem',marginTop: '0.5rem', color:'#999999' }}>
                    Quizzes are generated using gpt-4
                </Typography>
                <form onSubmit={handleSubmit} style={{marginLeft:'auto', marginRight:'auto', marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '50rem', padding:'3rem'}} >
                    <Grid container spacing={2}>
                        <Grid xs={11} sx={{marginLeft: 'auto'}}>
                            <TextField value={topicInput} sx={{marginRight:'1rem', backgroundColor: 'white', width:'100%'}} fullWidth id="quizGenInput" label="Your Topic" variant="outlined" required placeholder="e.g Cloud computing and distributed systems" InputLabelProps={{ shrink: true }} inputProps={{ maxLength: 50 }}/>
                        </Grid>
                        <Grid xs={1}>
                            <div style={{display: 'flex',flexDirection: 'column', marginLeft:'0.2rem'}}>
                                <IconButton onClick={randomTopic} aria-label="reroll" color="secondary" sx={{}}>
                                    <ChangeIcon />
                                </IconButton>
                                <Typography textAlign="center" variant="h2" sx={{ fontSize: '10px', color:'#2b2d42'}}>
                                example topic
                                </Typography>
                            </div>
                        </Grid>
                    </Grid>
                    <div style={{marginTop:'2rem', display:'block', width: '100%'}}>
                        <Typography textAlign="left" variant="h1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color:'#3b444b'}}>
                            Options:
                        </Typography>
                        <div style={{width:'90%', marginTop:'1rem', marginLeft: '7%'}}>
                            <Typography textAlign="left" variant="h1" sx={{ fontSize: '1.2rem', color:'#3b444b'  }}>
                                Number of Questions:
                            </Typography>
                            <div style={{width: '90%', marginRight:'5%'}}>
                                <Slider defaultValue={5} aria-label="Default" valueLabelDisplay="auto"  marks min={1} max={10}sx={{ color: '#008055' }}/>
                            </div>
                        </div>
                    </div>
                    
                </form>
            </div>  

            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
        </>
    )
}

export default Home