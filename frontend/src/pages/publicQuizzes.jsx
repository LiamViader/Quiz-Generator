import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, Fade} from '@mui/material';
import axios from 'axios';
import QuizListRenderer from '../components/QuizListRenderer';
import ModalQuizOpened from '../components/ModalQuizOpened';
import ErrorPopup from '../components/ErrorPopup';
function PublicQuizzes(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend

    const [errorPopupMessage,setErrorPopupMessage] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [counter, setCounter] = useState(0);
    const [data, setData] = useState(null);

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openedModalNow, setOpenedModalNow] = useState(false);

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
                quiz.quiz._id === quizId ? {
                    ...quiz, quiz: {
                        ...quiz.quiz,
                        questions: quiz.quiz.questions.map((question, index) =>
                            index === questionIndex
                              ? { ...question, userAnswer: newAnswer }
                              : question
                        )
                    }
                } : quiz
            )
        );
    };

    const handleQuizSolved = (quizId) =>{
        setQuizzes(prevQuizzes=>
            prevQuizzes.map(quiz=>
                quiz.quiz._id === quizId ? {
                    ...quiz, quiz: {
                        ...quiz.quiz,
                        solved: true
                    }
                } : quiz
            )
        );
    }

    const handleUnsolveQuiz = (quizId) =>{
        setQuizzes(prevQuizzes=>
            prevQuizzes.map(quiz=>
                quiz.quiz._id === quizId ? {
                    ...quiz, quiz: {
                        ...quiz.quiz,
                        solved: false,
                        questions: quiz.quiz.questions.map(question => ({
                            ...question,
                            userAnswer: null
                        }))
                    }
                } : quiz
            )
        );
    }
    
    const handleFormSumitted = () => {
        setCounter((prev)=>(prev+1));
        setQuizzes((prevQuizzes) => [
            { loading: true, addedNow:true, tempId:counter, quiz: {} },
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
                newQuizzes[indexToModify] = { ...newQuizzes[indexToModify], loading: false, quiz:data.data };
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
            <ResponsiveAppBar pages={[{name: 'Home', rout:'/'},]}/>
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',marginBottom:'1.5rem'}}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold',  color:'#2b2d42'  }}>
                    Public Quizzes 
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.1rem', marginTop: '0.3rem', color:'#2b2d42' }}>
                    All the latest quizzes made by the comunity
                </Typography>

            </div>  
            <hr style={{minWidth:'20rem', backgroundColor:'gray',border: 'none', height: '1px',  width: '30%', margin: '0 10px', marginLeft:'auto', marginRight:'auto' }} />
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <QuizListRenderer quizList={quizzes} onQuizClick={handleQuizClick} onUnsolve={handleUnsolveQuiz}/>
            </div>
            {showModal &&  selectedQuiz && <ModalQuizOpened  quiz={selectedQuiz} onCloseModal={handleCloseModal} onAnswerChange={handleAnswerChange} onQuizSolved={handleQuizSolved}/>}
            {errorPopupMessage && <ErrorPopup errorMessage={errorPopupMessage} onClose={() => setErrorPopupMessage(null)} />}
        </>
    )
}

export default PublicQuizzes