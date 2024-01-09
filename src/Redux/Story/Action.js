import { CREATE_STORY, FOLLOWING_USER_STORY, USER_STORY } from "./ActionType";
const BASE_API = "http://localhost:5454/api"

export const findFollowingUserStory = (data) => async(dispatch) => {
    const res = await fetch(`${BASE_API}/story/${data.userIds}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.jwt,
        }
    });
    const stories = await res.json();
    console.log('story: ',stories);
    dispatch({type: FOLLOWING_USER_STORY, payload: stories})
}

export const findStoryByUserId = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/story/${data.userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            }
        });
        const stories = await res.json();
        dispatch({type: USER_STORY, payload: stories})
    } catch (error) {
        console.log('catch error: ', error)
    }
}

export const createStory = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/story/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + data.jwt,
            },
            body: JSON.stringify(data.data), 
        });
        const story = await res.json();
        dispatch({type: CREATE_STORY, payload: story})
    } catch (error) {
        console.log('catch error: ', error)
    }
}
