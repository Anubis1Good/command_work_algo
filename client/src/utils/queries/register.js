
export const registerUser = async (event, formRef, setData, resource, 
  method = 'post',
  contentType = 'application/json',
  applyCookies = true
) => {
  event.preventDefault()

  const formData = new FormData(formRef.current)
  const body = Object.fromEntries(formData)

  const response = await fetch(resource, {
    method,
    credentials: 'include',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': contentType
    }
  })

  const jsonData = await response.json()

  localStorage.setItem('authenticated', 'true')

  if (applyCookies) {
    const cookies = response.headers.get('Set-Cookie');
    console.log(cookies);
    cookies.split(';').forEach(cookie => document.cookie = cookie)
  }

  setData(jsonData)
}
