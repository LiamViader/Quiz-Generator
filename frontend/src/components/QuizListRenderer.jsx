import React from "react";
import QuizClosed from "./QuizClosed";
import { Slide } from "@mui/material";

function QuizListRenderer({quizList, onQuizClick}){
    return(
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'flex-start', height: '100%', width: '90%', marginLeft:'auto', marginRight:'auto'}}>
            {quizList.map((quiz, index) => (

                <QuizClosed quiz={quiz} onQuizClick={onQuizClick} key={quiz.loading ? quiz.tempId : quiz.quiz.id } />            
            ))}
        </div>
    );
}

export default QuizListRenderer