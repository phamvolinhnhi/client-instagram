import { REQ_USER } from "../User/ActionType";
import { ERROR, SIGN_IN, SIGN_UP } from "./ActionType";

export const signinAction = (data) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5454/signin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Basic ' + btoa(data.email + ':' + data.password),
            },
        });
        if (!res.ok) {
            // Handle non-successful responses (e.g., 4xx, 5xx)
            throw new Error(`Failed to sign in: ${res.status} - ${res.statusText}`);
        }
        const token = res.headers.get('Authorization');
        localStorage.setItem('token', token);
        dispatch({ type: SIGN_IN, payload: token });
        console.log('signin token:', token);

    } catch (error) {
        dispatch({ type: ERROR, payload: 'Please double-check your information.' });
        console.log(error)
    }
}

export const signupAction = (data) => async (dispatch) => {
    try {
        const res = await fetch('http://localhost:5454/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), 
        });
        if (!res.ok) {
            // Handle non-successful responses (e.g., 4xx, 5xx)
            if (res.status === 401) {
                console.error('Unauthorized: Authentication failed');
                // Handle authentication failure, display a message or redirect to login
            } else {
                throw new Error(`Failed to sign up: ${res.status} - ${res.statusText}`);
            }
        }
        const user = await res.json();
        console.log('signup user:', user)
        dispatch({type: SIGN_UP, payload: user});

    } catch (error) {
        dispatch({ type: ERROR, payload: 'User already exists.' });
        console.log(error)
    }
}

export const logoutAction = () => async(dispatch) => {
    localStorage.removeItem('token');
    dispatch({type:REQ_USER, payload:null})
}