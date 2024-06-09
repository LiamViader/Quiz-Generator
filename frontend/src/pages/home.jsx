import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, Fade} from '@mui/material';
import axios from 'axios';
import FormQuizGenerator from '../components/FormQuizGen';
import QuizListRenderer from '../components/QuizListRenderer';
import ModalQuizOpened from '../components/ModalQuizOpened';
function Home(){
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend

    const exampleQuiz ={
        loading: true,
        quiz: {

        }
    }

    const exampleQuiz2 ={
        loading: false,
        quiz: {
            id: "12123eddsd",
            privacy: "private",
            name: "QUEPASAAAAAAAAAAAAAAAAAAAAA",
            solved: true
        }
    }

    const exampleQuiz3 ={
        loading: false,
        quiz: {
            id: "12123sdffeddsd",
            privacy: "private",
            name: "Hola",
            topic: "cloud computing",
            solved: false,
            questions: [
                {
                    question: "Com et dius?AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                    answers: [
                        "LiamAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
                        "Manel",
                        "Pedro"
                    ],
                    correctAnswer: 0,
                    userAnswer: null
                },
                {
                    question: "Com et dius?",
                    answers: [
                        "Liam",
                        "Manel",
                        "Pedro"
                    ],
                    correctAnswer: 0,
                    userAnswer: 1
                },
            ]
        }
    }

    const [quizzes, setQuizzes] = useState([exampleQuiz,exampleQuiz3, exampleQuiz2, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz, exampleQuiz]);

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
                quiz.quiz.id === quizId ? {
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

    useEffect(() => {
        axios.get(`${backendUrl}`) 
          .then(response => setData(response.data))
          .catch(error => console.error('Error:', error));
    }, [backendUrl]);
    
    const handleFormSumitted = () => {
        console.log("submitted");
    }

    return (
        <>  
            <ResponsiveAppBar/>
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
                <FormQuizGenerator onSubmit={handleFormSumitted}/>

            </div>  
            <hr style={{backgroundColor:'gray',border: 'none', height: '1px',  width: '60%', margin: '0 10px', marginLeft:'auto', marginRight:'auto' }} />
            <div style={{paddingLeft:'1rem', paddingRight:'1rem', minWidth:'20rem', marginTop: '2rem',}}>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 'bold',  color:'#2b2d42', marginTop: '1rem', marginBottom:'1rem'  }}>
                Generated Quizzes
                </Typography>
                <QuizListRenderer quizList={quizzes} onQuizClick={handleQuizClick}/>
            </div>

            <div>
                <h1>Datos desde el backend:</h1>
                {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : 'Cargando...'}
            </div>
            {showModal &&  selectedQuiz && <ModalQuizOpened  quiz={selectedQuiz} onCloseModal={handleCloseModal} onAnswerChange={handleAnswerChange}/>}
        </>
    )
}

export default Home