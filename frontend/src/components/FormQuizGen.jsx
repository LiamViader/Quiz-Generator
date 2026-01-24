import React from "react";
import { useEffect, useState } from 'react';
import { Typography, TextField, IconButton, Slider, Grid, FormControl, MenuItem, InputLabel, Select, FormHelperText, Collapse, Button } from '@mui/material';
import ChangeIcon from '@mui/icons-material/ChangeCircle';
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import client from "../api/client";


import { useQuiz } from '../context/QuizContext';
import { useAuth } from '../context/AuthContext';

function FormQuizGenerator() {
    const { handleFormSubmitted, handleResponse, handleErrorResponse, quizzes } = useQuiz();
    const { fetchUserProfile } = useAuth();

    // Check if any quiz is currently loading
    const isGenerating = quizzes.some(q => q.loading);

    const backendUrl = import.meta.env.VITE_API_URL;
    const endpoint = "/generator/generate-quiz";
    const generateQuizUrl = backendUrl + endpoint;

    const example_topics = [
        "Rick & Morty",
        "Quantum Physics for 5-year-olds",
        "The history of Pizza",
        "Cybersecurity best practices in 2024",
        "Lord of the Rings trivia",
        "Javascript",
        "The French Revolution",
        "90s Rock Music",
        "Ethical dilemmas in AI"
    ];

    const [topicInput, setTopicInput] = useState("");
    const [numberQuestions, setNumberQuestions] = useState(7);
    const [exampleTopicIndex, setExampleTopicIndex] = useState(0);
    const [difficulty, setDifficulty] = useState("medium");
    const [language, setLanguage] = useState("english");
    const [showingOptions, setShowingOptions] = useState(false);
    // Remove local waitingResponse state, use derived state from context
    // const [waitingResponse, setWaitingResponse] = useState(false); 
    const [nameInput, setNameInput] = useState("");
    const [privacyInput, setPrivacyInput] = useState("private");
    const [rotationAngle, setRotationAngle] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!isGenerating) {
            let name;
            if (nameInput == "") name = topicInput;
            else name = nameInput;
            if (showingOptions) toggleOptions();

            handleFormSubmitted();

            try {
                const response = await client.post(endpoint, {
                    topic: topicInput,
                    difficulty: difficulty,
                    language: language,
                    name: name,
                    numberQuestions: parseInt(numberQuestions),
                    privacy: privacyInput
                });
                onResponseContext(response.data);
                if (fetchUserProfile) await fetchUserProfile(); // Refresh counter
                setNameInput("");

            } catch (error) {
                console.log(error);
                handleErrorResponse(error);
            }
        }
    }

    // Wrapper to ensure handleResponse is called correctly
    const onResponseContext = (data) => {
        handleResponse(data);
    }

    const handleSliderChange = (e) => {
        setNumberQuestions(parseInt(e.target.value));
    }

    const handleTopicChange = (event) => {
        setTopicInput(event.target.value);
    }

    const handleDifficultyChange = (event) => {
        setDifficulty(event.target.value);
    }

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
    }

    const handleNameChange = (event) => {
        setNameInput(event.target.value);
    }

    const handlePrivacyChange = (event) => {
        setPrivacyInput(event.target.value);
    }

    const randomTopic = (event) => {
        setRotationAngle(prev => prev + 360);
        setExampleTopicIndex(prevIndex => {
            let newIndex = -1;
            if (prevIndex + 1 < example_topics.length) newIndex = prevIndex + 1;
            else newIndex = 0;
            return newIndex;
        });
        setTopicInput(example_topics[exampleTopicIndex]);
    }

    const toggleOptions = () => {
        setShowingOptions(prevOptions => !prevOptions)
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginLeft: 'auto', marginRight: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '50rem', padding: '2rem 1rem' }} >
            <Grid container spacing={2}>
                <Grid item xs={10}>
                    <TextField onChange={handleTopicChange} disabled={isGenerating} value={topicInput} sx={{ marginRight: '1rem', backgroundColor: 'white', width: '100%' }} fullWidth id="quizGenInput" label="Your Topic" variant="outlined" required placeholder="e.g Cloud computing and distributed systems" InputLabelProps={{ shrink: true }} inputProps={{ maxLength: 120 }} />
                </Grid>
                <Grid item xs={2}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <IconButton onClick={randomTopic} aria-label="reroll" sx={{ color: '#051923', marginLeft: 'auto', marginRight: 'auto' }}>
                            <ChangeIcon sx={{ fontSize: '2rem', transition: 'transform 0.5s ease', transform: `rotate(${rotationAngle}deg)` }} />
                        </IconButton>
                        <Typography textAlign="center" variant="h2" sx={{ fontSize: '10px', color: '#051923' }}>
                            example prompt
                        </Typography>
                    </div>
                </Grid>
            </Grid>
            <Grid container alignItems="center" spacing={2} style={{ marginTop: '1rem' }}>
                <Grid item xs={12} sm={7} sx={{ order: { xs: 2, sm: 1 }, display: 'flex', flexDirection: 'row', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
                    <Typography onClick={toggleOptions} textAlign="left" variant="h1" sx={{ fontSize: '1rem', fontWeight: 'bold', color: '#051923', marginTop: 'auto', marginBottom: 'auto' }}>
                        More Options
                    </Typography>
                    <IconButton onClick={toggleOptions} aria-label="toggleOptions" sx={{ color: '#051923', marginLeft: '0.3rem' }}>
                        {showingOptions ? <ArrowDropUpIcon /> : <ArrowDropDownCircleIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12} sm={5} sx={{ order: { xs: 1, sm: 2 }, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, maxWidth: { xs: '20rem', sm: '100%' }, margin: { xs: 'auto', sm: '0' } }}>
                    <Button disabled={isGenerating} type="submit" variant="contained" endIcon={<AutoFixHighIcon />} sx={{ backgroundColor: '#00cf89', minWidth: '60%', '&:hover': { backgroundColor: '#00a16b', boxShadow: 'none' }, width: { xs: '100%', sm: 'auto' } }}>
                        GENERATE
                    </Button>
                </Grid>
            </Grid>
            <Collapse in={showingOptions} sx={{ width: '100%' }}>
                <div style={{ marginTop: '1rem', display: 'block', width: '90%', marginLeft: '7%' }}>
                    <Typography textAlign="left" variant="h1" sx={{ fontSize: '1.2rem', color: '#051923' }}>
                        Number of Questions:
                    </Typography>
                    <div style={{ width: '90%', marginRight: '5%' }}>
                        <Slider onChange={handleSliderChange} value={numberQuestions} aria-label="Default" valueLabelDisplay="auto" marks min={1} max={10} sx={{ color: '#00cf89' }} />
                        <Grid container spacing={2} sx={{}}>
                            <Grid item xs={6} sx={{ marginLeft: 'auto' }} >
                                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                    <InputLabel id="difficulty-label">Difficulty</InputLabel>
                                    <Select labelId="difficulty-label" id="difficulty" value={difficulty} onChange={handleDifficultyChange} autoWidth label="difficulty" sx={{ backgroundColor: 'white' }}>
                                        <MenuItem value={'very easy'}>Basic</MenuItem>
                                        <MenuItem value={'easy'}>Easy</MenuItem>
                                        <MenuItem value={'medium'}>Medium</MenuItem>
                                        <MenuItem value={'hard'}>Hard</MenuItem>
                                        <MenuItem value={'almost impossible'}>Extreme</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                    <InputLabel id="language-label">Language</InputLabel>
                                    <Select labelId="language-label" id="language" value={language} onChange={handleLanguageChange} autoWidth label="language" sx={{ backgroundColor: 'white' }}>
                                        <MenuItem value={'english'}>English</MenuItem>
                                        <MenuItem value={'spanish'}>Spanish</MenuItem>
                                        <MenuItem value={'catalan'}>Catalan</MenuItem>
                                        <MenuItem value={'french'}>French</MenuItem>
                                        <MenuItem value={'italian'}>Italian</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{}}>
                            <Grid item xs={6} sx={{ marginLeft: 'auto' }} >
                                <TextField onChange={handleNameChange} disabled={isGenerating} value={nameInput} size='small' sx={{ marginLeft: '0.5rem', width: '80%', marginTop: '0.5rem' }} fullWidth id="quizNameInput" label="Quiz Name" variant="standard" inputProps={{ maxLength: 120 }} />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
                                    <InputLabel id="privacy-label">Privacy</InputLabel>
                                    <Select labelId="privacy-label" id="privacy" value={privacyInput} onChange={handlePrivacyChange} autoWidth label="privacy" sx={{ backgroundColor: 'white' }}>
                                        <MenuItem value={'private'}>Private</MenuItem>
                                        <MenuItem value={'public'}>Public</MenuItem>
                                    </Select>
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