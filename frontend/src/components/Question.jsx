import React from "react";
import { Typography, Box, Radio, FormControlLabel, Paper, RadioGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function Question({ question, questionIndex, onAnswerChange, solved }) {
    // Comparem com a Strings per evitar problemes de tipus (string vs number)
    const isCorrect = String(question.userAnswer) === String(question.correctAnswer);

    return (
        <Paper elevation={0} sx={{
            mb: 3, borderRadius: 4, overflow: 'hidden',
            border: '1px solid',
            // Si està resolt, el borde de la targeta indica si la pregunta és correcta o no
            borderColor: solved ? (isCorrect ? '#4caf50' : '#f44336') : '#e0e0e0',
            bgcolor: solved ? (isCorrect ? '#fafffa' : '#fffafa') : '#ffffff',
        }}>
            {/* Enunciat */}
            <Box sx={{ p: 2, bgcolor: solved ? (isCorrect ? '#e8f5e9' : '#ffebee') : '#f8f9fa' }}>
                <Typography sx={{ fontWeight: 700, color: '#334759' }}>
                    {questionIndex + 1}. {question.question}
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <RadioGroup
                    value={question.userAnswer}
                    onChange={(e) => onAnswerChange(questionIndex, e.target.value)}
                >
                    {question.answers?.map((answer, index) => {
                        const isThisCorrect = String(index) === String(question.correctAnswer);
                        const isThisUserChoice = String(index) === String(question.userAnswer);

                        // LÒGICA DE COLORS POST-FINALITZAR:
                        let bgColor = 'transparent';
                        let border = '1px solid transparent';

                        if (solved) {
                            if (isThisCorrect) {
                                // La correcta sempre es marca en verd
                                bgColor = '#c8e6c9';
                                border = '1px solid #4caf50';
                            } else if (isThisUserChoice && !isThisCorrect) {
                                // Si l'usuari ha triat aquesta i és malament, es marca en vermell
                                bgColor = '#ffcdd2';
                                border = '1px solid #f44336';
                            }
                        }

                        return (
                            <Box key={index} sx={{
                                borderRadius: 2, mb: 1, px: 1,
                                bgcolor: bgColor,
                                border: border,
                                transition: 'all 0.2s ease'
                            }}>
                                <FormControlLabel
                                    value={index}
                                    disabled={solved} // Bloquegem ràdios un cop finalitzat
                                    control={<Radio size="small" />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', py: 1 }}>
                                            <Typography sx={{ flexGrow: 1, fontSize: '0.9rem' }}>
                                                {answer}
                                            </Typography>
                                            {solved && isThisCorrect && <CheckCircleIcon sx={{ color: '#2e7d32', ml: 1 }} />}
                                            {solved && isThisUserChoice && !isThisCorrect && <CancelIcon sx={{ color: '#d32f2f', ml: 1 }} />}
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