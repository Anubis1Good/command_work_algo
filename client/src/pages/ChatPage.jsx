export default function () {
    return (
        <div className="container">
            <div className="chat_area">
                <Messages/>
            </div>
            <div className="send_area">
                <form action="/api/v1/chat/${chat}" method="post">
                    <input type="text" name="message" id="message" />
                    <input type="submit" value="Отправить" />
                </form>
            </div>
        </div>
    )
}