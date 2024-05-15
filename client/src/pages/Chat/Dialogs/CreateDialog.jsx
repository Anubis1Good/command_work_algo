import { useState, useRef } from 'react';
import BodyForm from '../../../components/BodyForm/BodyForm';
import { createChat } from '../../../utils/queries/chats.js';

import styles from './CreateDialog.module.css';
export default function CreateDialog() {
    const dialogRef = useRef(null);

    const handleFormSubmit = (event, formData) => {
        createChat(formData.name);
        dialogRef.current.close();
    };

    return (
        <>
            <button className={styles.create_button} onClick={() => dialogRef.current.showModal()}>Создать чат</button>
    
            <dialog className={styles.create_dialog} ref={dialogRef}>
        
                <button onClick={() => dialogRef.current.close()}>Закрыть</button>
        
                <BodyForm resource='/api/v1/chats' style={styles.create_form} method='POST' navigateTo='' onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Название чата" />
                    <input type="submit" value="Создать" />
                </BodyForm>
        
            </dialog>
        </>
    );
}
