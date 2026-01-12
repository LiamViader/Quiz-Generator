import React from 'react';
import { useEffect, useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import QuizListRenderer from '../components/QuizListRenderer';
import ModalQuizOpened from '../components/ModalQuizOpened';
import ErrorPopup from '../components/ErrorPopup';
import fetchPublicQuizzes from '../utils/fetchPublicQuizzes';
import { useOnMountUnsafe } from '../hooks/useOnMountUnsafe';

function PublicQuizzes() {
    const backendUrl = import.meta.env.VITE_API_URL; //url de servidor backend
    const [quizzesPage, setQuizzesPage] = useState(1);
    const [errorPopupMessage, setErrorPopupMessage] = useState(null);
    const [quizzes, setQuizzes] = useState([]);

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [openedModalNow, setOpenedModalNow] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [fetchingData, setfetchingData] = useState(false);

    async function fetchData() {
        setfetchingData(true);
        try {
            const limit = 15;
            const response = await fetchPublicQuizzes(quizzesPage, limit);

            if (response.length < limit) {
                setHasMore(false);
            }

            console.log(response);
            setfetchingData(false);
            handleReceivedQuizzes(response);
        } catch (error) {
            setfetchingData(false);
            handleErrorResponse(error);
        }
    }

    useOnMountUnsafe(() => {
        fetchData();
    }, []);

    const handleReceivedQuizzes = (data) => {
        if (data.length == 0) {
            setHasMore(false);
        }
        setQuizzesPage((prevQuizzesPage) => prevQuizzesPage + 1);
        setQuizzes((prevQuizzes) => (
            [...prevQuizzes, ...data]
        ));
        console.log(1);
    };

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQuiz(null);
    };

    const handleAnswerChange = (quizId, questionIndex, newAnswer) => {
        setQuizzes(prevQuizzes =>
            prevQuizzes.map(quiz =>
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

    const handleQuizSolved = (quizId) => {
        setQuizzes(prevQuizzes =>
            prevQuizzes.map(quiz =>
                quiz._id === quizId ? {
                    ...quiz,
                    solved: true,
                } : quiz
            )
        );
    }

    const handleUnsolveQuiz = (quizId) => {
        setQuizzes(prevQuizzes =>
            prevQuizzes.map(quiz =>
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


    const handleLoadMore = () => {
        fetchData();
    }


    const handleErrorResponse = (error) => {
        const errorMessage = error.response?.data?.message || error.message || 'An error just happened';
        setErrorPopupMessage(errorMessage);
    }

    return (
        <>
            <ResponsiveAppBar pages={[{ name: 'Home', rout: '/' },]} />
            <div style={{ paddingLeft: '1rem', paddingRight: '1rem', minWidth: '20rem', marginTop: '2rem', marginBottom: '1.5rem' }}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold', color: '#2b2d42' }}>
                    Public Quizzes
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.1rem', marginTop: '0.3rem', color: '#2b2d42' }}>
                    All the latest quizzes made by the comunity
                </Typography>

            </div>
            <hr style={{ minWidth: '20rem', backgroundColor: 'gray', border: 'none', height: '1px', width: '30%', margin: '0 10px', marginLeft: 'auto', marginRight: 'auto' }} />
            <div style={{ paddingLeft: '1rem', paddingRight: '1rem', minWidth: '20rem', marginTop: '2rem', }}>

                <QuizListRenderer quizList={quizzes} onQuizClick={handleQuizClick} onUnsolve={handleUnsolveQuiz} />
                {fetchingData && <div style={{ marginLeft: 'auto', marginRight: 'auto', width: '10rem', display: 'flex', marginTop: '2rem' }}><CircularProgress size='3.5rem' sx={{ color: 'gray', marginLeft: 'auto', marginRight: 'auto' }} /></div>}
                {!fetchingData && hasMore &&
                    <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem' }}>
                        <Button size="small" variant="contained" sx={{ backgroundColor: '#83a8aa', '&:hover': { backgroundColor: '#4a5f69', }, marginLeft: 'auto', marginRight: 'auto' }} onClick={handleLoadMore}>
                            Load More
                        </Button>
                    </div>
                }
            </div>
            {showModal && selectedQuiz && <ModalQuizOpened quiz={selectedQuiz} onCloseModal={handleCloseModal} onAnswerChange={handleAnswerChange} onQuizSolved={handleQuizSolved} />}
            {errorPopupMessage && <ErrorPopup errorMessage={errorPopupMessage} onClose={() => setErrorPopupMessage(null)} />}
        </>
    )
}

export default PublicQuizzes