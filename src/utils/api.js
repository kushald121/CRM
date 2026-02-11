const API_URL = 'https://crm-backend-1-kvok.onrender.com/api';

export const fetchData = async (endpoint, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // Increased to 60 seconds for cold starts

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            credentials: 'include', // Important for sessions/cookies
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.error || `Error ${response.status}: ${response.statusText}`;
            console.error(`API Error on ${endpoint}:`, errorMessage);
            throw new Error(errorMessage);
        }

        return response.json();
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            throw new Error('The backend is taking a long time to respond (Render cold start). Please wait about 30 seconds and refresh.');
        }
        console.error('Fetch error:', error.message);
        throw error;
    }
};
