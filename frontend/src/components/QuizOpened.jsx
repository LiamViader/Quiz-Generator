import React, { useState } from "react";
import { Box, Typography, Button, LinearProgress, Paper } from "@mui/material";
import Question from "./Question";

function QuizOpened({ onSolved, quiz, onAnswerChange }) {
    const [quizState, setQuizState] = useState(quiz);

    const handleAnswerChange = (questionIndex, newAnswer) => {
        setQuizState(prevQuiz => {
            const updatedQuiz = {
                ...prevQuiz,
                questions: prevQuiz.questions.map((q, index) =>
                    index === questionIndex ? { ...q, userAnswer: newAnswer } : q
                ),
            };
            return updatedQuiz;
        });
        onAnswerChange(quizState._id, questionIndex, newAnswer);
    };

    const onSend = () => {
        setQuizState(prev => ({ ...prev, solved: true }));
        onSolved(quizState._id);
    };

    const correctAnswers = () => quizState.questions?.reduce((acc, q) => acc + (q.userAnswer == q.correctAnswer ? 1 : 0), 0);
    const questionsAnswered = () => quizState.questions?.filter(q => q.userAnswer != null).length || 0;
    const totalQuestions = quizState.questions?.length || 0;
    const progress = (questionsAnswered() / totalQuestions) * 100;

    return (
        <Box sx={{ bgcolor: quizState.solved ? '#f0f4f8' : 'white', minHeight: '100%' }}>
            {/* Barra de Progrés Moderna */}
            {!quizState.solved && (
                <Box sx={{ width: '100%', position: 'sticky', top: 0, zIndex: 10, bgcolor: 'white' }}>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{ height: 6, bgcolor: '#eee', '& .MuiLinearProgress-bar': { bgcolor: '#00cf89' } }}
                    />
                </Box>
            )}

            <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
                {/* Score Hero Card */}
                {quizState.solved && (
                    <Paper elevation={0} sx={{
                        p: 3, mb: 4, borderRadius: 4, textAlign: 'center',
                        background: 'linear-gradient(135deg, #051923 0%, #0a2d3e 100%)', color: '#7fffd4'
                    }}>
                        <Typography variant="h6" sx={{ opacity: 0.8, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: 2 }}>Results</Typography>
                        <Typography variant="h3" sx={{ fontWeight: 800 }}>{correctAnswers()} / {totalQuestions}</Typography>
                    </Paper>
                )}

                {/* Llistat de Preguntes */}
                {quizState.questions?.map((question, index) => (
                    <Question
                        solved={quizState.solved}
                        question={question}
                        questionIndex={index}
                        key={question._id}
                        onAnswerChange={handleAnswerChange}
                    />
                ))}

                {/* Footer amb Botó i Comptador */}
                {!quizState.solved && (
                    <Box sx={{ mt: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2 }}>
                        <Button
                            onClick={onSend}
                            variant="contained"
                            disabled={questionsAnswered() < totalQuestions}
                            sx={{
                                bgcolor: '#00cf89', fontWeight: 'bold', px: 4, borderRadius: 2,
                                '&:hover': { bgcolor: '#00a16b' }, textTransform: 'none'
                            }}
                        >
                            Finish Quiz
                        </Button>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: questionsAnswered() < totalQuestions ? 'error.main' : 'success.main' }}>
                            {questionsAnswered()} / {totalQuestions} answered
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default QuizOpened;