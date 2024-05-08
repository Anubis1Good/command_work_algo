
export const registerUser = async (event, formRef, setData, resource, method = 'post',contentType = 'application/json',applyCookies = true) => {
  event.preventDefault()

  const formData = new FormData(formRef.current)
  const body = Object.fromEntries(formData)

  console.log('registerUser: formData', formData)
  console.log('registerUser: body', body)

  const response = await fetch(resource, {
    method,
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': contentType
    }
  })

  console.log('registerUser: response', response)
  const jsonData = await response.json()

  if (applyCookies) {
    const cookies = response.headers.get('Set-Cookie');
    console.log('registerUser: cookies', cookies)
    // cookies.split(';').forEach(cookie => document.cookie = cookie)
  }

  console.log('registerUser: jsonData', jsonData)
  setData(jsonData)
}
