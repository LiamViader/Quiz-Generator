import React from "react";
import { Typography, List, ListItem, RadioGroup, ListItemText, Radio, FormControlLabel } from "@mui/material";
import { useState } from "react";

function Question({question, questionIndex, onAnswerChange}){

    const [selectedAnswer, setSelectedAnswer] = useState(question.userAnswer);

    const handleAnswerChange = (event) => {
        document.activeElement.blur();
        setSelectedAnswer(event.target.value);
        onAnswerChange(questionIndex, event.target.value)
    };

    return (
        <div>
            <Typography variant="h6" component="h2" sx={{ marginBottom: '1rem', marginTop: '1rem' }}>
            {questionIndex+1}. {question.question}
            </Typography>
            <hr style={{ backgroundColor: 'gray', border: 'none', height: '1px', width: '100%', margin: '0 10px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '1rem' }} />
            <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                <List>
                    {question.answers && question.answers.map((answer, index) => (
                    <ListItem key={index}>
                        <FormControlLabel
                        value={index}
                        control={<Radio />}
                        label={<ListItemText primary={answer} />}
                        />
                    </ListItem>
                    ))}
                </List>
            </RadioGroup>
        </div>
    );
}

export default Question