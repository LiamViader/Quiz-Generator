import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import client from '../api/client';

const QuizContext = createContext();

export const useQuiz = () => {
  return useContext(QuizContext);
};

export const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [counter, setCounter] = useState(0);
  const [error, setError] = useState(null);
  const { user } = useAuth(); // Consume auth context

  // React to user changes: Fetch quizzes on login, clear on logout
  useEffect(() => {
    if (user) {
      // User logged in: Load initial page of quizzes
      // We only fetch page 1 here automatically. User can load more manually.
      fetchUserQuizzes(1);
    } else {
      // User logged out: Clear quizzes
      setQuizzes([]);
    }
  }, [user]);

  // Fetch user quizzes with pagination.
  // We use this instead of separate AuthContext calls to centralize logic.
  const fetchUserQuizzes = async (page = 1, limit = 20) => {
    try {
      const res = await client.get(`/quizzes/mine?page=${page}&pageSize=${limit}`);
      if (res.data && res.data.length > 0) {
        loadUserQuizzes(res.data);
        return res.data;
      }
      return [];
    } catch (error) {
      console.error("Error fetching user quizzes:", error);
      throw error;
    }
  };

  const addQuiz = (quiz) => {
    setQuizzes((prevQuizzes) => [quiz, ...prevQuizzes]);
  };

  const loadUserQuizzes = (userQuizzes) => {
    setQuizzes(prevQuizzes => {
      // Keep current anonymous quizzes (those not in userQuizzes)
      // To avoid duplicates, we filter out any prevQuiz that has an ID present in userQuizzes
      const currentUnique = prevQuizzes.filter(pQ =>
        !pQ._id || !userQuizzes.some(uQ => uQ._id === pQ._id)
      );
      return [...currentUnique, ...userQuizzes];
    });
  };

  const handleFormSubmitted = () => {
    setCounter((prev) => (prev + 1));
    setQuizzes((prevQuizzes) => [
      { loading: true, addedNow: true, tempId: counter },
      ...prevQuizzes
    ]);
  };

  const handleResponse = (data) => {
    setQuizzes(prevQuizzes => {
      // Find the loading quiz (LIFO - Last In First Out assumption for single user flow)
      // Or ideally use tempId if we passed it back, but logical flow suggests the topmost loading quiz
      let indexToModify = prevQuizzes.slice().reverse().findIndex(quiz => quiz.loading);

      // Adjust index to original array
      indexToModify = prevQuizzes.length - 1 - indexToModify;

      if (indexToModify === -1) {
        // If no loading quiz found, just add it (unwrapped)
        const quizData = data.data || data;
        return [quizData, ...prevQuizzes];
      } else {
        // Replace loading placeholder with actual data, ensuring we unwrap if needed
        const newQuizzes = [...prevQuizzes];
        // The API likely returns { data: { ...quiz } } based on previous home.jsx logic
        const quizResult = data.data || data;

        newQuizzes[indexToModify] = {
          ...newQuizzes[indexToModify],
          loading: false,
          ...quizResult
        };
        return newQuizzes;
      }
    });
  };

  const handleErrorResponse = (err) => {
    // Remove the loading placeholder
    setQuizzes(prevQuizzes => {
      const indexToDelete = prevQuizzes.slice().reverse().findIndex(quiz => quiz.loading);
      if (indexToDelete === -1) {
        return prevQuizzes;
      } else {
        const newQuizzes = prevQuizzes.filter((_, index) => index !== prevQuizzes.length - 1 - indexToDelete);
        return newQuizzes;
      }
    });

    // Set global error message
    const errorMessage = err.response?.data?.message || err.message || 'An error just happened';
    setError(errorMessage);
  };

  const updateQuiz = (quizId, updatedFields) => {
    setQuizzes(prevQuizzes =>
      prevQuizzes.map(quiz =>
        quiz._id === quizId ? { ...quiz, ...updatedFields } : quiz
      )
    );
  };

  const makeQuizPublic = async (quizId) => {
    try {
      await client.patch(`/quizzes/${quizId}/privacy`, { privacy: 'public' });
      updateQuiz(quizId, { privacy: 'public' });
    } catch (error) {
      console.error("Failed to make quiz public", error);
      setError("Failed to make quiz public.");
    }
  };

  // Specific helpers for questions/solving could be generic updateQuiz, 
  // but keeping specific helpers can be cleaner for consuming components
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
    updateQuiz(quizId, { solved: true });
  };

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
  };

  const value = {
    quizzes,
    setQuizzes,
    error,
    setError,
    handleFormSubmitted,
    handleResponse,
    handleErrorResponse,
    handleAnswerChange,
    handleQuizSolved,
    handleUnsolveQuiz,
    loadUserQuizzes,
    fetchUserQuizzes,
    makeQuizPublic
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
