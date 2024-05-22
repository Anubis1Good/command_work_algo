import { useState, useRef } from 'react';
import BodyForm from '../../../components/BodyForm/BodyForm';
import { createChat } from '../../../utils/queries/chats.js';

import styles from './CreateDialog.module.css';
import { FaPlus } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
export default function CreateDialog() {
    const dialogRef = useRef(null);

    const handleFormSubmit = async  (event, formData) => {
        const response = await createChat(formData.name);

        if (response.error) {
            console.error(response.error);
            toast.error(response.error);
            return;
        }

        toast.success("Чат создан");
        dialogRef.current.close();
    };

    return (
        <>
            <button className={styles.create_button} onClick={() => dialogRef.current.showModal()}><FaPlus/> Создать чат</button>
    
            <dialog className={styles.create_dialog} ref={dialogRef}><div className={styles.create_dialog_header}>
                <p>Создать чат</p>
                <button onClick={() => dialogRef.current.close()} className={styles.close}><IoMdClose /></button></div>
        
                <BodyForm resource='/api/v1/chats' style={styles.create_form} method='POST' navigateTo='' onSubmit={handleFormSubmit}>
                    <input type="text" name="name" placeholder="Название чата" />
                    <input type="submit" value="Создать" />
                </BodyForm>
        
            </dialog>
        </>
    );
}
