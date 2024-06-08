import React from "react";
import { useEffect, useState } from 'react';
import { Typography, TextField, IconButton, Slider, Grid, FormControl, MenuItem, InputLabel, Select, FormHelperText, Collapse } from '@mui/material';
import ChangeIcon from '@mui/icons-material/ChangeCircle';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';


function FormQuizGenerator(){

    const example_topics=["Rick & Morty", "klk", "hola"];

    const [topicInput, setTopicInput] = useState("");
    const [exampleTopicIndex, setExampleTopicIndex] = useState(0);
    const [difficulty, setDifficulty] = useState("medium");
    const [language, setLanguage] = useState("english");
    const [showingOptions, setShowingOptions] = useState(false);

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

    const toggleOptions = (event) =>{
        setShowingOptions(prevOptions => !prevOptions)
    }

    return (
        <form onSubmit={handleSubmit} style={{marginLeft:'auto', marginRight:'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '50rem', padding:'2rem'}} >
            <Grid container spacing={2}>
                <Grid item xs={11}>
                    <TextField onChange={handleTopicChange} value={topicInput} sx={{marginRight:'1rem', backgroundColor: 'white', width:'100%'}} fullWidth id="quizGenInput" label="Your Topic" variant="outlined" required placeholder="e.g Cloud computing and distributed systems" InputLabelProps={{ shrink: true }} inputProps={{ maxLength: 50 }}/>
                </Grid>
                <Grid item xs={1}>
                    <div style={{display: 'flex',flexDirection: 'column'}}>
                        <IconButton onClick={randomTopic} aria-label="reroll"  sx={{ color:'#051923', marginLeft: 'auto', marginRight: 'auto'}}>
                            <ChangeIcon />
                        </IconButton>
                        <Typography textAlign="center" variant="h2" sx={{ fontSize: '10px', color:'#051923'}}>
                        example prompt
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <div style={{display:'flex', flexDirection: 'row', alignItems: 'center', marginRight:'auto', marginTop: '0.5rem'}}>
                <Typography onClick={toggleOptions} textAlign="left" variant="h1" sx={{ fontSize: '1.2rem', fontWeight: 'bold', color:'#3b444b', }}>
                        More Options
                </Typography>
                <IconButton onClick={toggleOptions} aria-label="toggleOptions"  sx={{ color:'#051923'}}>
                    {showingOptions? (<ArrowDropUpIcon/>) : (<ArrowDropDownCircleIcon/>)}
                </IconButton>
            </div>
            <Collapse in={showingOptions} sx={{width:'100%'}}>
                <div style={{marginTop:'1rem', display:'block', width:'90%', marginLeft: '7%'}}>
                    <Typography textAlign="left" variant="h1" sx={{ fontSize: '1.2rem', color:'#3b444b'  }}>
                        Number of Questions:
                    </Typography>
                    <div style={{width: '90%', marginRight:'5%'}}>
                        <Slider defaultValue={5} aria-label="Default" valueLabelDisplay="auto"  marks min={1} max={10} sx={{ color: '#3b444b' }}/>
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
            </Collapse >
            
        </form>
    );
}

export default FormQuizGenerator