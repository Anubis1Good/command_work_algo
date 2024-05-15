
export const registerUser = async (name, password) => {

  const response = await fetch('/api/v1/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: name, password: password} )
  })


  return response.ok
}

export const loginUser = async (name, password) => {
  const response = await fetch('/api/v1/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: name, password: password} )
  })

  return response.ok
}