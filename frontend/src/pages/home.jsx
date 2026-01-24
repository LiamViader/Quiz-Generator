import React, { useState } from 'react';
import ResponsiveAppBar from '../components/ResponsiveAppBar';
import { Typography, Fade } from '@mui/material';
import FormQuizGenerator from '../components/FormQuizGen';
import QuizListRenderer from '../components/QuizListRenderer';
import ModalQuizOpened from '../components/ModalQuizOpened';
import ErrorPopup from '../components/ErrorPopup';
import LimitAnnouncement from '../components/LimitAnnouncement';
import { useQuiz } from '../context/QuizContext';

import { useAuth } from '../context/AuthContext';
import { CircularProgress, Button, Box } from '@mui/material';

function Home() {
    const { quizzes, handleAnswerChange, handleQuizSolved, handleUnsolveQuiz, fetchUserQuizzes, makeQuizPublic, error, setError } = useQuiz();
    const { user, login } = useAuth();

    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // Pagination state
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);

    const handleQuizClick = (quiz) => {
        setSelectedQuiz(quiz);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedQuiz(null);
    };

    const handleLoadMore = async () => {
        setLoadingMore(true);
        try {
            const nextPage = page + 1;
            const newQuizzes = await fetchUserQuizzes(nextPage);
            if (newQuizzes.length < 20) {
                setHasMore(false);
            }
            setPage(nextPage);
        } catch (err) {
            // Error handling handled by context or we can set local error
        } finally {
            setLoadingMore(false);
        }
    };

    // Reset pagination when user changes (e.g. logout)
    // Actually AuthContext handles initial load (page 1). 
    // We just need to ensure page is reset if we logout and login again.
    // Effect to reset page? 
    /* 
    useEffect(() => {
        if(!user) { setPage(1); setHasMore(true); } 
    }, [user]); 
    */
    // For now simple implementation.

    return (
        <>
            <ResponsiveAppBar pages={[{ name: 'Home', rout: '/' }, { name: 'Public Quizzes', rout: '/publicQuizzes' }]} />
            <div style={{ paddingLeft: '1rem', paddingRight: '1rem', marginTop: '3rem', }}>
                <Typography textAlign="center" variant="h1" sx={{ fontSize: '2.7rem', fontWeight: 'bold', color: '#2b2d42' }}>
                    Automatic quiz generator
                </Typography>
                <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.1rem', marginTop: '0.3rem', color: '#2b2d42' }}>
                    Generate a quiz from a given topic or explanation
                </Typography>
                <Typography textAlign="center" variant="body1" sx={{ fontSize: '0.8rem', color: '#999999' }}>
                    Quizzes are generated using gpt-4
                </Typography>
                <LimitAnnouncement user={user} login={login} />
                <FormQuizGenerator />

            </div>
            <hr style={{ backgroundColor: 'gray', border: 'none', height: '1px', width: '60%', margin: '0 10px', marginLeft: 'auto', marginRight: 'auto' }} />
            <div style={{ paddingLeft: '1rem', paddingRight: '1rem', marginTop: '2rem', paddingBottom: '12rem' }}>
                {quizzes.length > 0 &&
                    <Typography textAlign="center" variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#2b2d42', marginTop: '1rem', marginBottom: '1rem' }}>
                        Generated Quizzes
                    </Typography>
                }
                <QuizListRenderer quizList={quizzes} onQuizClick={handleQuizClick} onUnsolve={handleUnsolveQuiz} onMakePublic={makeQuizPublic} />

                {user && hasMore && quizzes.length >= 20 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleLoadMore}
                            disabled={loadingMore}
                            sx={{ backgroundColor: '#051923', color: '#7fffd4' }}
                        >
                            {loadingMore ? <CircularProgress size={24} color="inherit" /> : "Load More"}
                        </Button>
                    </Box>
                )}
            </div>
            {showModal && selectedQuiz && <ModalQuizOpened quiz={selectedQuiz} onCloseModal={handleCloseModal} onAnswerChange={handleAnswerChange} onQuizSolved={handleQuizSolved} />}
            {error && <ErrorPopup errorMessage={error} onClose={() => setError(null)} />}
        </>
    )
}

export default Home