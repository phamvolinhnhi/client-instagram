import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGE } from "./ActionType"

const initialValue={
    messages: [],
    createdMessage: null,
}

export const MessageReducer = (store=initialValue, {type, payload})=>{
    if(type===CREATE_NEW_MESSAGE) {
        return {...store, createdMessage: payload}
    }
    else if(type===GET_ALL_MESSAGE) {
        return {...store, messages: payload}
    }
    return store;
}