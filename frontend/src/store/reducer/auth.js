import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState ={
    token: null,
    label: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const authSuccess = (state,action) => {
    return updatedObject(state, {
        token: action.idToken,
        error: null,
        loading: false
    })
}

const setLabel = (state,action) => {
    return updatedObject(state, {
        label: action.label
    })
}

const authFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const authLogout = (state,action) => {
    return updatedObject(state, {token: null, label: null})
}

const setAuthRedirectPath = (state, action) => {
    return updatedObject(state, {authRedirectPath: action.path})
}


const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.AUTH_START:
            return authStart(state,action)
        case actions.AUTH_SUCCESS:
            return authSuccess(state,action)
        case actions.AUTH_FAIL:
            return authFail(state,action)
        case actions.AUTH_LOGOUT:
            return authLogout(state,action)
        case actions.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state,action)
        case actions.SET_LABEL:
            return setLabel(state,action)
        default:
            return state
    }
}

export default reducer