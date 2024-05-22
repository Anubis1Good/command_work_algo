import { useRef } from 'react';
import BodyForm from '../../../components/BodyForm/BodyForm';
import { joinChat } from '../../../utils/queries/chats.js';
import styles from './JoinDialog.module.css';
import { BsPeople } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import toast from 'react-hot-toast';
export default function JoinDialog() {
    const joindialogRef = useRef(null);

    return (
        <>
            <button className={styles.join_button} onClick={() => { joindialogRef.current.showModal();}}><BsPeople />Присоединиться</button>

                        <dialog className={styles.join_dialog} ref={joindialogRef}><div className={styles.join_dialog_header}>
                <p>Присоединиться</p>
                <button onClick={() => joindialogRef.current.close()} className={styles.close}><IoMdClose /></button></div>
                

                <BodyForm navigateTo='' onSubmit={async (event, formData) => {
                    const data = await joinChat(formData.token);
                    if (data.error) { 
                        toast.error(data.error);
                        return;
                    }
                    toast.success("Вы присоединились к чату");
                    joindialogRef.current.close();
                }}>
                    <input type="text" name="token" placeholder="Токен Приглашения" />
                    <input type="submit" value="Присоединиться" />
                </BodyForm>
            </dialog>
        </>
    );
}
