import styles from "./BodyForm.module.css"
import { useRef, useState } from 'react'
export default function BodyForm({children, resource, method="post",contentType="application/json", applyCookies=true}) {
  const formRef = useRef(null)
  const [data, setData] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(formRef.current)

    const jsonData = {}
    formData.forEach((value, key) => {jsonData[key] = value})

    fetch(resource, {method: method, credentials: 'include',body: JSON.stringify(jsonData),headers: {'Content-Type': contentType}})
      .then((response) => {
        if (applyCookies) {
          const cookies = response.headers.get('Set-Cookie')
          if (cookies) {
            cookies.forEach(cookie => document.cookie = cookie);
          }
        }
        return response.json()
      }
    )
      .then((data) => setData(data))
      .catch((error) => console.error(error))
  }

  return (
    <form className={styles.div} ref={formRef} onSubmit={handleSubmit}>
      {children}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </form>
  )
}

