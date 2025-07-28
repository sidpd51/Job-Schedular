import axios from 'axios';

const BACKEND_URL = import.meta.env.BACKEND_URL || 'http://localhost:3000/api/v1';

export const fetchImportLog = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/importlogs`, {
            params: { page, limit }
        });
        return response.data.data;
    } catch (error) {
        console.error('Error fetching import history:', error);
        throw error;
    }
};