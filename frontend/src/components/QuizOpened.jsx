import React, { useState } from "react";
import { Box, Typography, Button, LinearProgress, Paper, Divider } from "@mui/material";
import Question from "./Question";

function QuizOpened({ onSolved, quiz, onAnswerChange }) {
    const [quizState, setQuizState] = useState(quiz);

    const questionsAnswered = quizState.questions?.filter(q => q.userAnswer != null).length || 0;
    const totalQuestions = quizState.questions?.length || 0;
    const progress = (questionsAnswered / totalQuestions) * 100;

    const handleAnswerChange = (questionIndex, newAnswer) => {
        setQuizState(prev => ({
            ...prev,
            questions: prev.questions.map((q, i) => i === questionIndex ? { ...q, userAnswer: newAnswer } : q)
        }));
        onAnswerChange(quizState._id, questionIndex, newAnswer);
    };

    const correctAnswers = quizState.questions?.reduce((acc, q) => acc + (q.userAnswer == q.correctAnswer ? 1 : 0), 0);

    return (
        <Box sx={{ bgcolor: quizState.solved ? '#f0f4f8' : '#ffffff', minHeight: '100%', pb: 4 }}>
            {/* Progress Bar (només si no està resolt) */}
            {!quizState.solved && (
                <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 5, bgcolor: 'white' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 8, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#00cf89' } }}
                    />
                </Box>
            )}

            <Box sx={{ px: { xs: 2, md: 5 }, py: 3 }}>
                {quizState.solved && (
                    <Paper elevation={0} sx={{
                        mb: 4, p: 3, textAlign: 'center', borderRadius: 4,
                        background: 'linear-gradient(135deg, #7fffd4 0%, #00cf89 100%)',
                        color: '#051923'
                    }}>
                        <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 600 }}>Final Score</Typography>
                        <Typography variant="h2" sx={{ fontWeight: 900 }}>{correctAnswers()} / {totalQuestions}</Typography>
                    </Paper>
                )}

                {quizState.questions?.map((question, index) => (
                    <Question
                        solved={quizState.solved}
                        question={question}
                        questionIndex={index}
                        key={question._id}
                        onAnswerChange={handleAnswerChange}
                    />
                ))}

                {!quizState.solved && (
                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                        <Button
                            onClick={() => onSolved(quizState._id)}
                            variant="contained"
                            disabled={questionsAnswered < totalQuestions}
                            sx={{
                                py: 1.5, px: 4, borderRadius: 3, fontWeight: 'bold', fontSize: '1.1rem',
                                textTransform: 'none', boxShadow: '0 8px 20px rgba(0, 207, 137, 0.3)',
                                bgcolor: '#00cf89', '&:hover': { bgcolor: '#00a16b' }
                            }}
                        >
                            Finish Quiz
                        </Button>
                        <Typography sx={{ fontWeight: 600, color: progress === 100 ? '#00cf89' : 'text.secondary' }}>
                            {questionsAnswered} of {totalQuestions} answered
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
export default QuizOpened;