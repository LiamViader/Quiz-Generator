import client from '../api/client';

const endpoint = "/quizzes/public";

async function fetchPublicQuizzes(page, pageSize) {
    try {
        const response = await client.get(endpoint, {
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