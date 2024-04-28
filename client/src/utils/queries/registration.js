export function fetchRegistration(name, password) {
    fetch('http://localhost:3000/api/v1/register', {
        method: 'post',
        body: JSON.stringify({
            name: name,
            password: password,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
}
