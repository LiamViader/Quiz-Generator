import React from "react";
import { Box, Typography } from "@mui/material";
import Question from "./Question";

function QuizOpened({quiz, onAnswerChange}){

    const style = {
        backgroundColor: 'background.paper',
        px: 4,
        py: 3
    };

    const handleAnswerChange = (questionIndex, newAnswer) => {
        onAnswerChange(quiz.id,questionIndex,newAnswer);
    }

    return (
        <Box sx={style}>

            {quiz.questions && quiz.questions.map((question, index) => (
                <Question question={question} questionIndex={index} key={index} onAnswerChange={handleAnswerChange}/>
            ))}


        </Box>
    );
}
export default QuizOpened