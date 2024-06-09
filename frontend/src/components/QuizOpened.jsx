import React from "react";
import { Box, Typography, Button } from "@mui/material";
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

    const onSend=(event) => {
        event.target.blur();
    }

    return (
        <Box sx={style}>

            {quiz.questions && quiz.questions.map((question, index) => (
                <Question question={question} questionIndex={index} key={index} onAnswerChange={handleAnswerChange}/>
            ))}

            <hr style={{ backgroundColor: 'gray', border: 'none', height: '1px', width: '50%', margin: '2rem 0', marginRight: 'auto', marginLeft:'auto', marginBottom: '1rem' }} />
            <div style={{display:'flex', marginBottom: '1rem', alignItems:'center', marginTop:'2rem'}}>
                <Button onClick={onSend} type="submit" variant="contained" sx={{backgroundColor:'#00cf89', minWidth:'30%', '&:hover': {backgroundColor: '#00a16b', boxShadow: 'none'},}}>
                    Send
                </Button>
                <Typography variant="h7" fontSize={'1.2rem'} sx={{marginLeft:'auto'}}>You have answered 10/10 questions</Typography>
            </div>
        </Box>
    );
}
export default QuizOpened