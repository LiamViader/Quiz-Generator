import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Question from "./Question";
import { useState } from "react";

function QuizOpened({onSolved, quiz, onAnswerChange}){
    const [quizState,setQuizState] = useState(quiz);


    const handleAnswerChange = (questionIndex, newAnswer) => {
        setQuizState(prevQuiz => {
            const updatedQuiz = {
                ...prevQuiz,
                questions: prevQuiz.questions.map((question, index) =>
                    index === questionIndex ? { ...question, userAnswer: newAnswer } : question
                ),
            };
            return updatedQuiz;
        });
        onAnswerChange(quizState.id, questionIndex, newAnswer);
    }

    const onSend=(event) => {
        setQuizState(prevQuiz => {
            const updatedQuiz = {
                ...prevQuiz,
                solved: true
            };
            onSolved(updatedQuiz.id);
            return updatedQuiz;
        });
    }

    const correctAnswers=()=>quizState.questions && quizState.questions.reduce((acumulador, question)=>{
        return acumulador + (question.userAnswer == question.correctAnswer ? 1 : 0);
    },0);

    const questionsAnswered=() => quizState.questions && quizState.questions.reduce((acumulador, question) => {
        return acumulador + (question.userAnswer != null ? 1 : 0);
    }, 0);

    return (
        <Box sx={{ backgroundColor: quizState.solved ? '#c6dff5' : 'background.paper' ,px: 4,py: 2}}>
            { quizState.solved &&
                <div style={{ boxShadow:'inset 0px 4px 2px gray',marginBottom:'1.5rem', backgroundColor:'#b9d1e6', padding:'1rem',borderRadius: '1.2rem', marginLeft:'auto', marginRight:'auto'}}>
                    <Typography variant='h3' sx={{color:'#334759',marginLeft:'1rem', marginTop:'0.7rem', fontSize:'2rem', }}>Score: {correctAnswers()}/{quizState.questions && quizState.questions.length}</Typography>
                    <hr style={{ backgroundColor: '#97aaba', border: 'none', height: '2px', width: '100%',marginLeft:'0', marginBottom: '0rem' }} />
                </div>
            }

            {quizState.questions && quizState.questions.map((question, index) => (
                <Question solved={quizState.solved} question={question} questionIndex={index} key={index} onAnswerChange={handleAnswerChange}/>
            ))}

            {!quizState.solved ?
            <>
                <hr style={{ backgroundColor: 'gray', border: 'none', height: '1px', width: '50%', margin: '2rem 0', marginRight: 'auto', marginLeft:'auto', marginBottom: '1rem' }} />
                <div style={{display:'flex', marginBottom: '1rem', alignItems:'center', marginTop:'2rem'}}>
                    <Button onClick={onSend} type="submit" variant="contained" sx={{backgroundColor:'#00cf89', minWidth:'30%', '&:hover': {backgroundColor: '#00a16b', boxShadow: 'none'},}}>
                        Send
                    </Button>
                    <Typography variant="h7" fontSize={'1.2rem'} sx={{ color:quizState.questions && questionsAnswered()<quizState.questions.length && 'red',marginLeft:'auto', }}>
                        {questionsAnswered()}/{quizState.questions && quizState.questions.length} answered
                    </Typography>
                </div>
            </>
            :
            <>
            </>
            }
        </Box>
    );
}
export default QuizOpened