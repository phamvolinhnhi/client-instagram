import { FOLLOW_USER, GET_USERS_BY_USER_IDS, GET_USER_BY_USERNAME, POPULAR_USER, REQ_USER, SEARCH_USER, UNFOLLOW_USER, UPDATE_USER } from "./ActionType";

const BASE_API = "http://localhost:5454/api"

export const getUserProfileAction = (jwt) => async(dispatch) => {
    try {
        const res = await fetch('http://localhost:5454/api/user/req', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + jwt,
            },
        });
        if (!res.ok) {
            // Handle non-successful responses (e.g., 4xx, 5xx)
            throw new Error(`Failed to get user prf: ${res.status} - ${res.statusText}`);
        }
        else {
            const reqUser = await res.json();
            dispatch({type: REQ_USER, payload: reqUser});
            console.log('ok get user prf');
        }
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
    
}

export const findUserByUsernameAction = (data) => async(dispatch) => {
    try{
        const res = await fetch(`${BASE_API}/user/username/${data.username}`,{
            method: 'GET',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' +data.jwt,
            }
        });

        const user = await res.json();
        console.log('find by username: ', user);
        dispatch({type: GET_USER_BY_USERNAME, payload: user});
    } catch (error) {
        console.error('Error fetching user profile:', error);
    }
    
}

export const findUsersByUserIdsAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/m/${data.userIds}`,{
        method: 'GET',
        headers:{
            "Content-Type": 'application/json',
            Authorization: 'Bearer ' +data.jwt,
        }
    });

    const users = await res.json();
    console.log('find by user ids: ', users);
    dispatch({type: GET_USERS_BY_USER_IDS, payload: users});
    } catch(error) {
        console.error('Error fetching find users by ids:', error);
    }
}

export const followUserAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/follow/${data.userId}`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' +data.jwt,
            }
        });

        const user = await res.text();
        console.log('follow user: ', user);
        dispatch({type: FOLLOW_USER, payload: user});
    } catch(error) {
        console.error('Error: ', error);
    }
}

export const unfollowUserAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/unfollow/${data.userId}`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' +data.jwt,
            }
        });

        const user = await res.text();
        console.log('unfollow user: ', user);
        dispatch({type: UNFOLLOW_USER, payload: user})
    } catch (error){
        console.error('Error: ',error)
    }
}

export const searchUserAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/search?q=${data.query}`,{
            method: 'GET',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' +data.jwt,
            }
        });

        const users = await res.json();
        console.log('search user: ', users);
        dispatch({type: SEARCH_USER, payload: users});
    } catch (error) {
        // console.log('catch error: ', error)
        dispatch({type: SEARCH_USER, payload: []});
    }
}

export const editUserAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/account/edit`,{
            method: 'PUT',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' +data.jwt,
            },
            body: JSON.stringify(data.data)
        });

        const user = await res.json();
        console.log('edit user: ', user);
        dispatch({type: UPDATE_USER, payload: user});
    } catch (error) {
        console.log('catch error: ', error)
    }
}

export const getPopularUser = (jwt) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/user/popular`,{
            method: 'GET',
            headers:{
                "Content-Type": 'application/json',
                Authorization: 'Bearer ' + jwt,
            },
        });
        const user = await res.json();
        dispatch({type: POPULAR_USER, payload: user});
    } catch (error) {
        console.log('catch error: ', error)
    }
}