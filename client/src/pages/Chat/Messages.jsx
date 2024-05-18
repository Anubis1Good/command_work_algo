import styles from './Messages.module.css'

export default function(props) {

    function getAuthorName(user_id) {
        if (user_id) {
            console.log(props.currentChat.members)
            let member = props.currentChat.members ? props.currentChat.members.find((member) => member.id === user_id) : null
            if (!member) {
                console.log(`Got user id ${user_id} that is not in ${props.currentChat.members}`)
                return "Error"
            }
            return member.username
        }
        return "Error"
    }
    function renderMessages() {
        return props.messages ? props.messages.map((message) => {
            return (
                <div key={message.id} className={styles.message+(message.sender_id === props.user.id &&(' ' +  styles.messageOwn)) }  >
                    <div className={styles.messageHeader}><div className={styles.messageAuthor}>{ getAuthorName(message.sender_id)}</div>
                    <div className={styles.messageTime}>{new Date(message.send_time).toLocaleString()}</div></div>
                    <div className={styles.messageContent}>{message.message}</div>


                </div>
            )
        }) : <p>Нет сообщений</p>
    }
    return (
        <div className={styles.messages}>
            {renderMessages()}
        </div>
    )
}