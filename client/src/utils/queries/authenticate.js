
export const registerUser = async (name, password) => {
  try{
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
  catch(e){
    return false
    console.log(e)
  }
}

export const loginUser = async (name, password) => {
  try{
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
  catch(e){
    console.log(e)
    return false

  }
}

export const getMyself = async () => {
  const response = await fetch('/api/v1/me', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  const data = await response.json()
  return data.response
}