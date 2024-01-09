import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType";

const BASE_API = "http://localhost:5454/api"

export const createMessageAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/message/create`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token,
            },
            body: JSON.stringify(data.data)
        })
        const message = await res.json();
        dispatch({type:CREATE_NEW_MESSAGE, payload: message})
    } catch(error) {
        console.error('Catch error: ', error)
    }
}

export const getAllMessagesAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/message/chat/${data.chatId}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.token,
            },
        })
        const messages = await res.json();
        dispatch({type:GET_ALL_MESSAGE, payload: messages})
    } catch(error) {
        console.error('Catch error: ', error)
    }
}