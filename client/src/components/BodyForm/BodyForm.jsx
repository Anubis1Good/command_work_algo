/* eslint-disable react/prop-types */
import {useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom';



export default function BodyForm({
  children,
  onSubmit,
  navigateTo = '/',
  className

}) {
  const formRef = useRef(null);

  const onSubmitHandler = useCallback(onSubmit,[onSubmit]);
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
