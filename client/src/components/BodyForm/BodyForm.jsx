import {useContext, useRef, useState } from 'react'
import { registerUser } from '../../utils/queries/register'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

export default function BodyForm({
  children,
  resource,
  method = 'post',
  contentType = 'application/json'
}) {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const [isAuthenticated,setIsAuthenticated] = useContext(AuthContext);
  
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = new FormData(event.currentTarget);
    setFormData({
      ...formData,
      ...Object.fromEntries(Object.entries(formDataObject)),
    });


    const ok = registerUser(event,formRef,setFormData,resource,method,contentType);

    if (ok) {
      setIsAuthenticated(true);
    }
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

