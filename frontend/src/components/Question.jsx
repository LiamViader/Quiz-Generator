import React from "react";
import { Typography, Box, List, ListItem, RadioGroup, ListItemText, Radio, FormControlLabel } from "@mui/material";
import { useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Question({question, questionIndex, onAnswerChange, solved}){

    const [selectedAnswer, setSelectedAnswer] = useState(question.userAnswer);

    const handleAnswerChange = (event) => {
        document.activeElement.blur();
        setSelectedAnswer(event.target.value);
        onAnswerChange(questionIndex, event.target.value)
    };

    const correct = ()=>{
        if(question.userAnswer==null) return false;
        else return question.userAnswer==question.correctAnswer;
    };

    return (
        <div style={{backgroundColor:solved ? '#b9d1e6' : '#ededed',marginBottom:'1rem', borderRadius:'1.2rem', boxShadow:' 0px 4px 11px gray'}}>
            <div style={{borderTopRightRadius: '1.2rem',borderTopLeftRadius:'1.2rem', padding:'0.2rem 1rem', backgroundColor: solved && correct() ? '#9bc5a7' : solved && !correct() ? '#c59b9b' :'transparent' }}>
                <Typography variant="h6" component="h2" sx={{color:'#334759', marginBottom: '1rem', marginTop: '1rem', fontSize:'0.95rem' }}>
                {questionIndex+1}. {question.question}
                </Typography>
            </div>

            {!solved&&<hr style={{backgroundColor: 'gray', border: 'none', height: '1px', width: '90%', margin: '0 5px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1rem' }} />}
            <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                <List >
                    {question.answers && question.answers.map((answer, index) => (
                    <ListItem key={index}>
                        <FormControlLabel
                        value={index}
                        control={<Radio  disabled={solved}/>}
                        label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ListItemText sx={{ color: '#334759' }} primaryTypographyProps={{ sx: { fontSize: '0.8rem' } }} primary={answer} />
                            
                            { solved && 
                            <>
                                {index==question.correctAnswer ? 
                                <CheckIcon sx={{ ml: 1, color: correct() && question.userAnswer == index ? 'green' : 'gray' }} />
                                :
                                (!correct() && index==question.userAnswer) && <ClearIcon sx={{ ml: 1, color: !correct() && question.userAnswer == index ? 'red' : 'gray' }} />
                                
                                }
                            </>
                            }
                            
                        </Box>
                        }
                        />
                    </ListItem>
                    ))}
                </List>
            </RadioGroup>
        </div>
    );
}

export default Question