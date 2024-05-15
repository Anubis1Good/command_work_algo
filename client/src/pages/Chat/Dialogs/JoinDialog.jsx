import { useRef } from 'react';
import BodyForm from '../../../components/BodyForm/BodyForm';
import { joinChat } from '../../../utils/queries/chats.js';
import styles from './JoinDialog.module.css';
export default function JoinDialog() {
    const joindialogRef = useRef(null);

    return (
        <>
            <button className={styles.join_button} onClick={() => { joindialogRef.current.showModal();}}>Присоединиться к чату</button>

            <dialog className={styles.join_dialog} ref={joindialogRef}>
                <button onClick={() => joindialogRef.current.close()}>Закрыть</button>

                <BodyForm navigateTo='' onSubmit={(event, formData) => {
                    joinChat(formData.id);
                    joindialogRef.current.close();
                }}>
                    <input type="text" name="id" placeholder="ID чата" />
                    <input type="submit" value="Присоединиться" />
                </BodyForm>
            </dialog>
        </>
    );
}
