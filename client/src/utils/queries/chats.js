export const getChat = async (id) => {
    const response = await fetch(`/api/v1/chats/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}
export async function getChatMessages(chatId) {
    const response = await fetch(`/api/v1/chats/${chatId}/messages`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}
export const getJoinedChats = async () => {
    const response = await fetch(`/api/v1/chats/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}

export const joinChat = async (chatId) => {
    const response = await fetch(`/api/v1/chats/${chatId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}

export const createChat = async (name) => {
    const response = await fetch(`/api/v1/chats/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name})
    });
    const data = await response.json();
    return data.response;
}

export const leaveChat = async (chatId) => {
    const response = await fetch(`/api/v1/chats/${chatId}/leave`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}

export const deleteChat = async (chatId) => {
    const response = await fetch(`/api/v1/chats/${chatId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}
export const transferOwnership = async (chatId, userId) => {
    const response = await fetch(`/api/v1/chats/${chatId}/transfer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({user_id: userId})
    });
    const data = await response.json();
    return data.response;
}

export const renameChat = async (chatId, name) => {
    const response = await fetch(`/api/v1/chats/${chatId}/rename`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name: name})
    });
    const data = await response.json();
    return data.response;
}

export const getMembersFromChat = async (chatId) => {
    const response = await fetch(`/api/v1/chats/${chatId}/members`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    return data.response;
}

export const getUser = async (id) => {
    const response = await fetch(`/api/v1/users/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }});
    const data = await response.json();
    console.log(data)
    return data.response;
}
