import React from "react";
import QuizClosed from "./QuizClosed";

function QuizListRenderer({quizList}){
    return(
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'flex-start', height: '100%', width: '70%', marginLeft:'auto', marginRight:'auto'}}>
            {quizList.map((quiz, index) => (
                <QuizClosed quiz={quiz} key={quiz.loading ? `${index}-${JSON.stringify(quiz)}` : quiz.quiz.id } />
            ))}
        </div>
    );
}

export default QuizListRenderer