import * as actionTypes from './actionTypes'
import axios from 'axios'
import qs from 'qs'

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (token,label) => {
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        label:label
    }
}

export const authSetLabel = (label) => {
    return{
        type: actionTypes.SET_LABEL,
        label:label
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
        dispatch(logout())
        },expirationTime* 1000)
    }
}

export const authFail = (error) => {
    return{
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const auth = (email,password) => {
    return dispatch => {
        var label = null
        dispatch(authStart());
        const authData = {
            username: email,
            password: password,
            grant_type: 'password',
            client_id: 'live-test',
            client_secret: 'abcde'
        };
        axios({
            method: 'post',
            url: 'http://13.68.230.39:8080/oauth/token',
            data:qs.stringify(authData) ,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        .then(
            response => {
                axios({
                    method: 'get',
                    url: 'http://13.68.230.39:8080/e-commerce/register/getRole',
                    params:{
                        email: email
                    },
                    headers: {'Content-Type': 'application/json'}
                    })
                .then(
                    response => {
                        const val = response.data.roleList.map(da =>{
                          return da.authority  
                        })
                        
                        if(val[0]==='ROLE_ADMIN'){
                            label='admin'
                        }
                        if(val[0]==='ROLE_CUSTOMER'){
                            label='customer'
                        }
                        if(val[0]==='ROLE_SELLER'){
                            label='seller'
                        }
                        dispatch(authSetLabel(label))
                        localStorage.setItem('label',label)
                    }
                )
                .catch(
                    err => {
                        dispatch(authFail(err.response.data.error))
                    }
                )
                dispatch(authSuccess(response.data.access_token))
                const expirationDate =new Date(new Date().getTime() + response.data.expires_in * 1000)
                localStorage.setItem('token',response.data.access_token)
                localStorage.setItem('expirationDate',expirationDate)
                dispatch(checkAuthTimeout(response.data.expires_in))
            }
        )
        .catch(
            err => {
                console.log("err"+err);
                dispatch(authFail(err.response.data.error))
            }
        )
    }
}



export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            if(expirationDate <= new Date()){
                dispatch(logout())
            } 
            else {
                const label = localStorage.getItem('label')
                dispatch(authSuccess(token))
                dispatch(authSetLabel(label))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000))
            }
        }
    }
}

 
