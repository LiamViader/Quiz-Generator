import axios from 'axios';

const backendUrl = import.meta.env.VITE_API_URL;
const endpoint = "/quizzes/public";
const publicQuizzesUrl=backendUrl+endpoint;

async function fetchPublicQuizzes(page, pageSize) {
    try {
        const response = await axios.get(publicQuizzesUrl, {
            params: {
                page: page,
                pageSize: pageSize
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching public quizzes:', error);
        throw new Error('Failed to fetch public quizzes');
    }
}

export default fetchPublicQuizzes;