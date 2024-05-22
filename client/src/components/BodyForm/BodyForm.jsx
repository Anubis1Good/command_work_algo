import {useCallback, useContext, useRef, useState } from 'react'
import { registerUser } from '../../utils/queries/authenticate'
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../AuthProvider';

export default function BodyForm({
  children,
  onSubmit,
  navigateTo = '/',
  className

}) {
  const formRef = useRef(null);

  const onSubmitHandler = useCallback(onSubmit);
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const formDataObject = new FormData(event.currentTarget);
    const formData = Object.fromEntries(formDataObject.entries());
    onSubmitHandler(event,formData);

    event.currentTarget.reset();

    !!navigateTo && navigate(navigateTo);
  };

  return (
    <form ref={formRef}  onSubmit={handleSubmit} className={className}>
      {children}
    </form>
  );
}
