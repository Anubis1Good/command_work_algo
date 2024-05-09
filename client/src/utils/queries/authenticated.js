export const getIsAuthenticated = async () => {
    try {
        const response = await fetch('/api/v1/authenticated');
        const data = await response.json();
        return data.response;
    } catch (err) {
        console.error(err);
        return false;
    }
};
