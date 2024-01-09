import { CREATE_CHAT, CREATE_GROUP, GET_USER_CHATS } from "./ActionType";

const BASE_API = "http://localhost:5454/api"

export const createChatAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/chats/single`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token,
            },
            body: JSON.stringify(data.data)
        })
        const chat = await res.json();
        dispatch({type:CREATE_CHAT, payload: chat})
        console.log('Created chat: ', chat)
    } catch(error) {
        console.log('Catch error: ', error)
    }
}

export const createGroupChatAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/chats/group`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token
            },
            body: JSON.stringify(data.data)
        })
        const chat = await res.json();
        dispatch({type:CREATE_GROUP, payload: chat})
    } catch(error) {
        console.log('Catch error: ', error)
    }
}

export const getUserChatsAction = (token) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/chats/user`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token,
            },
        })
        const chats = await res.json();
        dispatch({type:GET_USER_CHATS, payload: chats})
    } catch(error) {
        console.log('Catch error: ', error)
    }
}