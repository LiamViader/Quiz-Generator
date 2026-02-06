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
        <Box sx={{ bgcolor: quizState.solved ? '#f4f6f8' : '#ffffff', minHeight: '100%' }}>
            {/* L'Score només apareix quan li donem a Finish */}
            {quizState.solved && (
                <Paper elevation={3} sx={{
                    p: 3, mx: 3, my: 4, borderRadius: 4, textAlign: 'center',
                    background: 'linear-gradient(45deg, #051923 30%, #0a2d3e 90%)',
                    color: '#7fffd4'
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 800 }}>
                        Score: {correctAnswers()} / {totalQuestions}
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.8 }}>
                        {((correctAnswers() / totalQuestions) * 100).toFixed(0)}% Correct
                    </Typography>
                </Paper>
            )}

            <Box sx={{ p: { xs: 2, md: 4 } }}>
                {quizState.questions?.map((question, index) => (
                    <Question
                        key={question._id}
                        question={question}
                        questionIndex={index}
                        solved={quizState.solved}
                        onAnswerChange={handleAnswerChange}
                    />
                ))}

                {!quizState.solved && (
                    <Box sx={{ textAlign: 'center', mt: 4 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => onSolved(quizState._id)} // Aquest activa el solved: true
                            disabled={questionsAnswered < totalQuestions}
                            sx={{
                                bgcolor: '#00cf89', borderRadius: 10, px: 6, py: 1.5,
                                fontSize: '1.2rem', fontWeight: 'bold',
                                '&:hover': { bgcolor: '#00a16b' }
                            }}
                        >
                            Finish and Reveal Results
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
}
export default QuizOpened;