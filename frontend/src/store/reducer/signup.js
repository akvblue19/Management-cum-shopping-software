import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    isLoading: false,
    error: null,
    data: null
}

const signupStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const signupSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        data: action.data,
        isLoading: false
    })
}

const signupFail = (state,action) => {
    return updatedObject(state, {
        error: action.err,
        isLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SIGNUP_START:
            return signupStart(state,action)
        case actions.SIGNUP_SUCCESS:
            return signupSuccess(state,action)
        case actions.SIGNUP_FAIL:
            return signupFail(state,action)
        default:
            return state
    }
}

export default reducer