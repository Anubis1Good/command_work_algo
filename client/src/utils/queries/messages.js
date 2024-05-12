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