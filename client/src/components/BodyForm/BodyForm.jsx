import {useRef, useState } from 'react'
import { registerUser } from '../../utils/queries/register'
import { useNavigate } from 'react-router-dom';


export default function BodyForm({
  children,
  resource,
  method = 'post',
  contentType = 'application/json',
  applyCookies = true,
}) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});

  
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = new FormData(event.currentTarget);
    setFormData({
      ...formData,
      ...Object.fromEntries(Object.entries(formDataObject)),
    });


    registerUser(event,formRef,setFormData,resource,method,contentType,applyCookies);
    event.currentTarget.reset();

    navigate('/');
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </form>
  );
}

