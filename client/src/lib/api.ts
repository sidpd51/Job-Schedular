import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1';

export const fetchImportLog = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/importlogs`);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching import history:', error);
        throw error;
    }
};