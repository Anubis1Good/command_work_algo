export const sendMessage = async (chat_id, message) => {

    const response = await fetch('/api/v1/chats/'+chat_id+'/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({message: message} )
    })

    return response.ok
}
export const deleteMessage = async (chat_id,message_id) => {
    const response = await fetch('/api/v1/chats/'+chat_id+'/message/'+message_id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return response.ok
}