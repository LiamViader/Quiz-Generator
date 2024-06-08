import React from "react";
import { Box, Typography } from "@mui/material";
import Question from "./Question";

function QuizOpened({quiz}){

    const style = {
        backgroundColor: 'background.paper',
        px: 4,
        py: 3
    };

    return (
        <Box sx={style}>

            {quiz.quiz.questions && quiz.quiz.questions.map((question, index) => (
                <Question question={question} index={index+1} key={index}/>
            ))}


        </Box>
    );
}
export default QuizOpened