import React from "react";
import { Typography, Box, Radio, FormControlLabel, Paper, RadioGroup } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Icona d'encert
import CancelIcon from '@mui/icons-material/Cancel';           // Icona d'error
import InfoIcon from '@mui/icons-material/Info';               // Per marcar la correcta si has fallat

function Question({ question, questionIndex, onAnswerChange, solved }) {
    const isCorrect = String(question.userAnswer) === String(question.correctAnswer);
    const hasAnswered = question.userAnswer != null;

    // Colors de fons per a la targeta quan està resolt
    const getCardBg = () => {
        if (!solved) return '#fafafa';
        return isCorrect ? '#e8f5e9' : '#ffebee'; // Verd molt suau o Vermell molt suau
    };

    // Colors per a la capçalera
    const getHeaderBg = () => {
        if (!solved) return 'rgba(0,0,0,0.03)';
        return isCorrect ? '#c8e6c9' : '#ffcdd2'; // Verd/Vermell una mica més intens
    };

    return (
        <Paper elevation={solved ? 2 : 0} sx={{
            mb: 3, borderRadius: 4, overflow: 'hidden',
            border: '1px solid',
            borderColor: solved ? (isCorrect ? '#4caf50' : '#f44336') : '#e0e0e0',
            bgcolor: getCardBg(),
            transition: 'all 0.3s ease'
        }}>
            {/* Header de la Pregunta */}
            <Box sx={{
                p: 2.5,
                bgcolor: getHeaderBg(),
                display: 'flex', alignItems: 'flex-start', gap: 1.5
            }}>
                <Typography sx={{ fontWeight: 800, color: '#334759' }}>{questionIndex + 1}.</Typography>
                <Typography sx={{ fontWeight: 600, color: '#334759', fontSize: '1rem' }}>
                    {question.question}
                </Typography>
            </Box>

            <Box sx={{ p: 2 }}>
                <RadioGroup value={question.userAnswer} onChange={(e) => onAnswerChange(questionIndex, e.target.value)}>
                    {question.answers?.map((answer, index) => {
                        const isUserChoice = String(question.userAnswer) === String(index);
                        const isCorrectAnswer = String(question.correctAnswer) === String(index);

                        // Lògica de colors per a cada fila de resposta
                        let rowBg = 'transparent';
                        let textColor = '#334759';
                        let fontWeight = 400;

                        if (solved) {
                            if (isCorrectAnswer) {
                                rowBg = 'rgba(76, 175, 80, 0.2)'; // Fons verd per la correcta
                                fontWeight = 700;
                            } else if (isUserChoice && !isCorrectAnswer) {
                                rowBg = 'rgba(244, 67, 54, 0.2)'; // Fons vermell si l'has triat i és incorrecta
                                textColor = '#d32f2f';
                            }
                        }

                        return (
                            <Box key={index} sx={{
                                borderRadius: 2, mb: 1, px: 2, py: 0.5,
                                bgcolor: rowBg,
                                border: solved && (isCorrectAnswer || (isUserChoice && !isCorrectAnswer))
                                    ? '1px solid rgba(0,0,0,0.1)'
                                    : '1px solid transparent',
                                transition: 'background-color 0.2s'
                            }}>
                                <FormControlLabel
                                    value={index}
                                    disabled={solved}
                                    control={<Radio size="small" sx={{
                                        '&.Mui-checked': { color: isCorrect ? '#4caf50' : '#f44336' }
                                    }} />}
                                    label={
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                                            <Typography sx={{ fontSize: '0.9rem', color: textColor, fontWeight: fontWeight, flexGrow: 1 }}>
                                                {answer}
                                            </Typography>

                                            {solved && (
                                                <>
                                                    {isCorrectAnswer && <CheckCircleIcon fontSize="small" sx={{ color: '#4caf50' }} />}
                                                    {isUserChoice && !isCorrectAnswer && <CancelIcon fontSize="small" sx={{ color: '#f44336' }} />}
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