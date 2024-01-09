import { CREATE_NEW_POST, DELETE_POST, GET_SINGLE_POST, GET_USER_POST, LIKE_POST, PROFILE_POST, SAVE_POST, UNLIKE_POST, UNSAVE_POST } from "./ActionType";

const BASE_API = "http://localhost:5454/api"

export const createPostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/create`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
            body: JSON.stringify(data.data)
        });

        const post = await res.json();
        console.log('created post: ', post);
        dispatch({type: CREATE_NEW_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const findUserPostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/following/${data.userIds}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + data.jwt,
        },
        });

        const posts = await res.json();
        console.log('find post by user ids:', posts);
        dispatch({ type: GET_USER_POST, payload: posts });
    } catch (error) {
        console.error('catch: ', error);
    }
};

// export const findUserPostAction = (data) => async (dispatch) => {
//   try {
//     const res = await fetch(`${BASE_API}/post/following/${data.userIds}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: 'Bearer ' + data.jwt,
//       },
//     });

//     // Check if the response status is OK
//     if (!res.ok) {
//       console.error('Server response not OK:', res.status);
//       return;
//     }

//     const responseBody = await res.text();

//     // Check if the response body is not empty before parsing JSON
//     if (responseBody.trim()) {
//       const posts = JSON.parse(responseBody);
//       console.log('find post by user ids:', posts);
//       dispatch({ type: GET_USER_POST, payload: posts });
//     } else {
//       console.warn('Empty response body');
//     }
//   } catch (error) {
//     console.log('catch: ', error);
//   }
// };

export const reqUserPostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/all/${data.userId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const posts = await res.json();
        console.log('profile post: ', posts);
        dispatch({type: PROFILE_POST, payload: posts});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const likePostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/like/${data.postId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const post = await res.json();
        console.log('like post:', post);
        dispatch({type: LIKE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const unlikePostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/unlike/${data.postId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const post = await res.json();
        console.log('unlike post:', post);
        dispatch({type: UNLIKE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const savePostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/save_post/${data.postId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const post = await res.json();
        console.log('saved post:', post);
        dispatch({type: SAVE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const unsavePostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/unsave_post/${data.postId}`,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const post = await res.json();
        console.log('unsaved post:', post);
        dispatch({type: UNSAVE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const findPostByIdAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/${data.postId}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });

        const post = await res.json();
        console.log('get post by id:', post);
        dispatch({type: GET_SINGLE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}

export const deletePostAction = (data) => async(dispatch) => {
    try {
        const res = await fetch(`${BASE_API}/post/delete/${data.postId}`,{
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' +data.jwt
            },
        });
        const post = await res.json();
        console.log('deleted post:', post);
        dispatch({type: DELETE_POST, payload: post});
    } catch (error) {
        console.log('catch: ', error)
    }
}