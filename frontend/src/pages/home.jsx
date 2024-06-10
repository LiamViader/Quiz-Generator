import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, Fade} from '@mui/material';
import axios from 'axios';
import FormQuizGenerator from '../components/FormQuizGen';
import QuizListRenderer from '../components/QuizListRenderer';
import ModalQuizOpened from '../components/ModalQuizOpened';
import ErrorPopup from '../components/ErrorPopup';
function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend

    const [errorPopupMessage,setErrorPopupMessage] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [counter, setCounter] = useState(0);

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQuiz(null);
    };

    const handleAnswerChange = (quizId,questionIndex,newAnswer) =>{
        setQuizzes(prevQuizzes=>
            prevQuizzes.map(quiz=>
                quiz._id === quizId ? {
                    ...quiz,
                    questions: quiz.questions.map((question, index) =>
                        index === questionIndex
                            ? { ...question, userAnswer: newAnswer }
                            : question
                    )
                } : quiz
            )
        );
    };

    const handleQuizSolved = (quizId) =>{
        setQuizzes(prevQuizzes=>
            prevQuizzes.map(quiz=>
                quiz._id === quizId ? {
                    ...quiz,
                    solved: true,
                } : quiz
            )
        );
    }

    const handleUnsolveQuiz = (quizId) =>{
        setQuizzes(prevQuizzes=>
            prevQuizzes.map(quiz=>
                quiz._id === quizId ? {
                    ...quiz,
                    solved: false,
                    questions: quiz.questions.map(question => ({
                        ...question,
                        userAnswer: null
                    }))
                } : quiz
            )
        );
    }

    
    const handleFormSumitted = () => {
        setCounter((prev)=>(prev+1));
        setQuizzes((prevQuizzes) => [
            { loading: true, addedNow:true, tempId:counter },
            ...prevQuizzes
        ]);

    }

    function deleteLoadingQuiz(){
        setQuizzes(prevQuizzes => {
            const indexToDelete = prevQuizzes.slice().reverse().findIndex(quiz => quiz.loading);
            
            if (indexToDelete === -1) {
                return prevQuizzes;
            } else {
                const newQuizzes = prevQuizzes.filter((_, index) => index !== prevQuizzes.length - 1 - indexToDelete);
                return newQuizzes;
            }
        });
    }

    const handleResponse=(data)=>{
        setQuizzes(prevQuizzes => {
            let indexToModify = prevQuizzes.slice().reverse().findIndex(quiz => quiz.loading);
            indexToModify=prevQuizzes.length-1-indexToModify;
            if (indexToModify === -1) {
                return prevQuizzes;
            } else {
                const newQuizzes = [...prevQuizzes]; // Crea una copia de la lista de quizzes
                newQuizzes[indexToModify] = { ...newQuizzes[indexToModify], loading: false, ...data.data };
                return newQuizzes;
            }
        });
    }

    const handleErrorResponse=(error)=>{
        deleteLoadingQuiz();
        const errorMessage = error.response?.data?.message || error.message || 'An error just happened';
        setErrorPopupMessage(errorMessage);
    }

    return (
        <>  
            <ResponsiveAppBar pages={[{name: 'Public Quizzes', rout:'/publicQuizzes'},]}/>
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold',  color:'#2b2d42'  }}>
                    Automatic quiz generator 
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.1rem', marginTop: '0.3rem', color:'#2b2d42' }}>
                    Generate a quiz from a given topic or explanation
                </Typography>
                <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem', color:'#999999' }}>
                    Quizzes are generated using gpt-4
                </Typography>
                <FormQuizGenerator onResponse={handleResponse} onErrorResponse={handleErrorResponse} onSubmit={handleFormSumitted}/>

            </div>  
            <hr style={{minWidth:'20rem', backgroundColor:'gray',border: 'none', height: '1px',  width: '60%', margin: '0 10px', marginLeft:'auto', marginRight:'auto' }} />
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                {quizzes.length>0 && 
                    <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 'bold',  color:'#2b2d42', marginTop: '1rem', marginBottom:'1rem'  }}>
                    Generated Quizzes
                    </Typography>
                }
                <QuizListRenderer quizList={quizzes} onQuizClick={handleQuizClick} onUnsolve={handleUnsolveQuiz}/>
            </div>
            {showModal &&  selectedQuiz && <ModalQuizOpened  quiz={selectedQuiz} onCloseModal={handleCloseModal} onAnswerChange={handleAnswerChange} onQuizSolved={handleQuizSolved}/>}
            {errorPopupMessage && <ErrorPopup errorMessage={errorPopupMessage} onClose={() => setErrorPopupMessage(null)} />}
        </>
    )
}

export default Home