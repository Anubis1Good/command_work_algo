export async function isAuthenticated() {
    return fetch('/api/v1/authenticated')
        .then(response => response.json().response);
}