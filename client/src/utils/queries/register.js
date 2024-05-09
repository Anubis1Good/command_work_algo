
export const registerUser = async (event, formRef, setData, resource, method = 'post',contentType = 'application/json') => {
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




  setData(jsonData)
  return response.ok
}
