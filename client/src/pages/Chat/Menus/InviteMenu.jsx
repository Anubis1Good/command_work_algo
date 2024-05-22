import { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { deleteInvite } from "../../../utils/queries/chats";
import { getUserInvites } from "../../../utils/queries/chats";
import styles from "./InviteMenu.module.css";

export default function InviteMenu(props) {

    const dialogRef = useRef(null);
    const [invites, setInvites] = useState([]);

    useEffect(() => {
        if (props.isInviteMenuOpen) {
            dialogRef.current.showModal();
        } else {
            dialogRef.current.close();
        }
    }, [props.isInviteMenuOpen])

    function renderInvites() {
        return renderInvitesList(invites)
    }

    useEffect(() => {
        getUserInvites(props.currentChat.id).then((data) => {
            if (data.length === 0) {
                setInvites([{id:-1}])
            }
            setInvites(data);
        })
    }, [ props.isInviteMenuOpen])
    function renderInvitesList(invites) {
        if (invites.length === 0 || invites[0].id === -1) return <p>Пусто</p>
        return invites.map((invite) => {
            return <div className={styles.inviteMenuInvite} key={invite.id}>
                <p className={styles.inviteMenuInviteText}>Токен: {invite.token}</p>
                <p className={styles.inviteMenuInviteText}>Закончится: {new Date(invite.expiry_time).toLocaleString()}</p>

                <button onClick={() => {
                    navigator.clipboard.writeText(invite.token)
                }} className={styles.inviteMenuInviteButton}>Скопировать</button>

                <button onClick={() => {
                    deleteInvite(invite.id)
                    setInvites(invites.filter((inv) => inv.id !== invite.id))
                }} className={styles.inviteMenuInviteButton}>Удалить</button>

            </div>
        })
    }

    return (<>
            
            <dialog className={styles.inviteMenu} ref={dialogRef}><div className={styles.inviteMenuHeader}>
                <p>Мои Приглашения</p>
                <button onClick={() => props.setIsInviteMenuOpen(false)} className={styles.close}><IoMdClose /></button></div>
                <div className={styles.inviteMenuContent}>
                {renderInvites()}</div>
            </dialog>
        </>
    )
}