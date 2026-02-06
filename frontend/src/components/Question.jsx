import React, { useState } from "react";
import { Typography, Box, Radio, FormControlLabel, Paper, RadioGroup } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

function Question({ question, questionIndex, onAnswerChange, solved }) {
    const [selectedAnswer, setSelectedAnswer] = useState(question.userAnswer);

    const handleAnswerChange = (event) => {
        document.activeElement.blur();
        setSelectedAnswer(event.target.value);
        onAnswerChange(questionIndex, event.target.value);
    };

    const correct = () => {
        if (question.userAnswer == null) return false;
        return question.userAnswer == question.correctAnswer;
    };

    // Colors segons la teva lògica de "solved"
    const getHeaderColor = () => {
        if (!solved) return 'rgba(0,0,0,0.03)';
        return correct() ? '#d4edda' : '#f8d7da';
    };

    return (
        <Paper elevation={0} sx={{
            mb: 3, borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0',
            bgcolor: solved ? (correct() ? '#fafffa' : '#fffafa') : '#fafafa'
        }}>
            {/* Header de la pregunta */}
            <Box sx={{ p: 2, bgcolor: getHeaderColor(), borderBottom: '1px solid #e0e0e0' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#334759', fontSize: '0.95rem' }}>
                    {questionIndex + 1}. {question.question}
                </Typography>
            </Box>

            {/* Respostes */}
            <Box sx={{ p: 1.5 }}>
                <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
                    {question.answers?.map((answer, index) => {
                        const isUserAnswer = selectedAnswer == index;
                        const isCorrectAnswer = question.correctAnswer == index;

                        return (
                            <Box key={index} sx={{
                                borderRadius: 2, px: 2, mb: 0.5,
                                bgcolor: solved && isCorrectAnswer ? 'rgba(0, 207, 137, 0.1)' : 'transparent',
                                border: solved && isCorrectAnswer ? '1px solid rgba(0, 207, 137, 0.2)' : '1px solid transparent'
                            }}>
                                <FormControlLabel
                                    value={index}
                                    control={<Radio disabled={solved} size="small" />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', py: 1 }}>
                                            <Typography sx={{ fontSize: '0.85rem', color: '#334759', flexGrow: 1 }}>
                                                {answer}
                                            </Typography>

                                            {solved && (
                                                <>
                                                    {isCorrectAnswer ? (
                                                        <CheckIcon fontSize="small" sx={{ ml: 1, color: correct() && isUserAnswer ? '#2e7d32' : '#9e9e9e' }} />
                                                    ) : (
                                                        (isUserAnswer && !correct()) && <ClearIcon fontSize="small" sx={{ ml: 1, color: '#d32f2f' }} />
                                                    )}
                                                </>
                                            )}
                                        </Box>
                                    }
                                    sx={{ width: '100%', m: 0 }}
                                />
                            </Box>
                        );
                    })}
                </RadioGroup>
            </Box>
        </Paper>
    );
}

export default Question;