import * as actionTypes from './actionTypes'
import axios from 'axios'

export const logoutStart = () => {
    return{
        type: actionTypes.APPLY_LOGOUT_START
    }
}

export const logoutSuccess = () => {
    return{
        type: actionTypes.APPLY_LOGOUT_SUCCESS
    }
}

export const logoutFail = () => {
    return{
        type: actionTypes.APPLY_LOGOUT_FAIL
    }
}


export const applyLogout = (token) => {
    return dispatch => {
        dispatch(logoutStart())
        axios({
            method: 'Get',
            url: 'http://13.68.230.39:8080/e-commerce/Logout/doLogout',
            headers: {
                'Authorization': 'Bearer '+ token
            }
            })
        .then(response => {
            dispatch(logoutSuccess())
        }).catch( err => {
            dispatch(logoutFail())
        })
    }
}