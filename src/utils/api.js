const API_URL = 'https://crm-backend-3e43.onrender.com/api';

export const fetchData = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'API request failed');
    }

    return response.json();
};
