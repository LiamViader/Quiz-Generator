import React from "react";
import { useEffect, useState } from 'react';
import { Typography, TextField, IconButton, Slider, Grid, FormControl, MenuItem, InputLabel, Select, FormHelperText } from '@mui/material';
import ChangeIcon from '@mui/icons-material/ChangeCircle';


function FormQuizGenerator(){

    const example_topics=["Rick & Morty", "klk", "hola"];

    const [topicInput, setTopicInput] = useState("");
    const [exampleTopicIndex, setExampleTopicIndex] = useState(0);
    const [difficulty, setDifficulty] = useState("medium");
    const [language, setLanguage] = useState("english");

    const handleSubmit = (event) =>{

    }

    const handleTopicChange = (event) =>{
        setTopicInput(event.target.value);
    }

    const handleDifficultyChange = (event) =>{
        setDifficulty(event.target.value);
    }

    const handleLanguageChange = (event) =>{
        setLanguage(event.target.value);
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
        <form onSubmit={handleSubmit} style={{marginLeft:'auto', marginRight:'auto', marginTop: '0.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '50rem', padding:'2rem'}} >
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <TextField onChange={handleTopicChange} value={topicInput} sx={{marginRight:'1rem', backgroundColor: 'white', width:'100%'}} fullWidth id="quizGenInput" label="Your Topic" variant="outlined" required placeholder="e.g Cloud computing and distributed systems" InputLabelProps={{ shrink: true }} inputProps={{ maxLength: 50 }}/>
                </Grid>
                <Grid item xs={1}>
                    <div style={{display: 'flex',flexDirection: 'column', marginLeft:'0.2rem'}}>
                        <IconButton onClick={randomTopic} aria-label="reroll"  sx={{ color:'#44ad8a'}}>
                            <ChangeIcon />
                        </IconButton>
                        <Typography textAlign="center" variant="h2" sx={{ fontSize: '10px', color:'#051923'}}>
                        example prompt
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
                        <Slider defaultValue={5} aria-label="Default" valueLabelDisplay="auto"  marks min={1} max={10} sx={{ color: '#44ad8a' }}/>
                        <Grid container spacing={2} sx={{}}>
                            <Grid item xs={6} sx={{marginLeft: 'auto'}} >
                                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                    <InputLabel id="difficulty-label">Difficulty</InputLabel>
                                    <Select labelId="difficulty-label" id="difficulty" value={difficulty} onChange={handleDifficultyChange} autoWidth label="difficulty">
                                        <MenuItem value={'very easy'}>Basic</MenuItem>
                                        <MenuItem value={'easy'}>Easy</MenuItem>
                                        <MenuItem value={'medium'}>Medium</MenuItem>
                                        <MenuItem value={'hard'}>Hard</MenuItem>
                                        <MenuItem value={'almost impossible'}>Extreme</MenuItem>
                                    </Select>
                                    <FormHelperText>Difficulty of the quiz</FormHelperText>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                    <InputLabel id="language-label">Language</InputLabel>
                                    <Select labelId="language-label" id="language" value={language} onChange={handleLanguageChange} autoWidth label="language">
                                        <MenuItem value={'english'}>English</MenuItem>
                                        <MenuItem value={'spanish'}>Spanish</MenuItem>
                                        <MenuItem value={'catalan'}>Catalan</MenuItem>
                                        <MenuItem value={'french'}>French</MenuItem>
                                        <MenuItem value={'italian'}>Italian</MenuItem>
                                    </Select>
                                    <FormHelperText>Language of the quiz</FormHelperText>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
            
        </form>
    );
}

export default FormQuizGenerator