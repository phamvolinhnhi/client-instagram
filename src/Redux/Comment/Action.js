import { CREATE_COMMENT, GET_POST_COMMENT, LIKE_COMMENT, UNLIKE_COMMENT } from "./ActionType";

const BASE_API = "http://localhost:5454/api"

export const createCommentAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comment/create/${data.postId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            // If the response is not ok, throw an error with the status text
            throw new Error(`HTTP error! Status: ${res.status} ${res.statusText}`);
        }
        const comment = await res.json();
        console.log("created comment: ", comment);
        dispatch({type:CREATE_COMMENT, payload: comment})
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const findPostCommentAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comment/${data.postId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            }
        });
        if (!res.ok) {
            // If the response is not ok, throw an error with the status text
            throw new Error(`Cannot find post's comments! Status: ${res.status} ${res.statusText}`);
        }
        const comments = await res.json();
        console.log("find post comment: ", comments);
        dispatch({type:GET_POST_COMMENT, payload: comments})
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const likeCommentAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comment/like/${data.commentId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            }
        });
        const comment = await res.json();
        console.log("like comment: ", comment);
        dispatch({type:LIKE_COMMENT, payload: comment})
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const unlikeCommentAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/comment/unLike/${data.commentId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            },
            body: JSON.stringify(data.data)
        });
        const comment = await res.json();
        console.log("unliked comment: ", comment);
        dispatch({type:UNLIKE_COMMENT, payload: comment})
    } catch (error) {
        console.log('catch: ', error)
    }
}