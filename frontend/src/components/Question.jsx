import React from "react";
import { Typography, Box, Radio, FormControlLabel, Paper, RadioGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Question({ question, questionIndex, onAnswerChange, solved }) {
    const isCorrect = question.userAnswer == question.correctAnswer;

    return (
        <Paper elevation={0} sx={{
            mb: 3, borderRadius: 4, overflow: 'hidden',
            border: '1px solid',
            borderColor: solved ? (isCorrect ? '#c3e6cb' : '#f5c6cb') : '#e0e0e0',
            bgcolor: solved ? (isCorrect ? '#f0fff4' : '#fff5f5') : '#fafafa'
        }}>
            {/* Header Pregunta */}
            <Box sx={{
                p: 2.5,
                bgcolor: solved ? (isCorrect ? '#d4edda' : '#f8d7da') : 'rgba(0,0,0,0.03)',
                display: 'flex', alignItems: 'flex-start', gap: 1.5
            }}>
                <Typography sx={{ fontWeight: 800, color: '#334759', mt: 0.3 }}>{questionIndex + 1}.</Typography>
                <Typography sx={{ fontWeight: 600, color: '#334759', fontSize: '1rem', lineHeight: 1.4 }}>
                    {question.question}
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <RadioGroup value={question.userAnswer} onChange={(e) => onAnswerChange(questionIndex, e.target.value)}>
                    {question.answers?.map((answer, index) => {
                        const isUserChoice = question.userAnswer == index;
                        const isCorrectAnswer = question.correctAnswer == index;

                        let cardBg = 'transparent';
                        if (solved) {
                            if (isCorrectAnswer) cardBg = 'rgba(0, 207, 137, 0.1)';
                            if (isUserChoice && !isCorrectAnswer) cardBg = 'rgba(244, 67, 54, 0.1)';
                        }

                        return (
                            <Box key={index} sx={{
                                borderRadius: 2, mb: 1, px: 2, py: 0.5,
                                transition: 'all 0.2s',
                                bgcolor: cardBg,
                                '&:hover': { bgcolor: !solved ? 'rgba(0,0,0,0.04)' : cardBg }
                            }}>
                                <FormControlLabel
                                    value={index}
                                    disabled={solved}
                                    control={<Radio size="small" sx={{ color: '#051923', '&.Mui-checked': { color: '#00cf89' } }} />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                            <Typography sx={{ fontSize: '0.9rem', color: '#334759', flexGrow: 1 }}>
                                                {answer}
                                            </Typography>
                                            {solved && isCorrectAnswer && <CheckCircleIcon fontSize="small" sx={{ color: '#00cf89' }} />}
                                            {solved && isUserChoice && !isCorrectAnswer && <CancelIcon fontSize="small" sx={{ color: '#f44336' }} />}
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