import { fetchData } from './api';

// No need to initialize localStorage anymore, but keeping for compatibility
export const initializeData = () => {
    console.log('Using database backend...');
};

// Projects
export const getProjects = async () => {
    return fetchData('/projects');
};

export const getProjectsByUserId = async (userId) => {
    // Backend handles filtering based on user role/id if needed,
    // but we can also filter here or use a specific endpoint.
    return fetchData('/projects');
};

export const addProject = async (project) => {
    return fetchData('/projects', {
        method: 'POST',
        body: JSON.stringify(project),
    });
};

export const updateProject = async (id, updatedData) => {
    return fetchData(`/projects/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
    });
};

export const deleteProject = async (id) => {
    return fetchData(`/projects/${id}`, {
        method: 'DELETE',
    });
};

// Reviews
export const getReviews = async () => {
    return fetchData('/reviews');
};

export const getReviewsByUserId = async (userId) => {
    return fetchData('/reviews');
};

export const addReview = async (review) => {
    return fetchData('/reviews', {
        method: 'POST',
        body: JSON.stringify(review),
    });
};

export const updateReview = async (id, updatedData) => {
    return fetchData(`/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData),
    });
};

export const deleteReview = async (id) => {
    return fetchData(`/reviews/${id}`, {
        method: 'DELETE',
    });
};

// Users
export const getUsers = async () => {
    return fetchData('/users');
};

// CSV Export (Optional)
export const exportToCSV = (data, filename) => {
    if (!data || data.length === 0) return;

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => Object.values(item).join(','));
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
};
