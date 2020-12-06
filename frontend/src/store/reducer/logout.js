import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    isLoading: false,
    error: null
}

const logoutStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const logoutSuccess = (state,action) => {
    return updatedObject(state, {
        loading: false
    })
}

const logoutFail = (state,action) => {
    return updatedObject(state, { loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.APPLY_LOGOUT_START:
            return logoutStart(state,action)
        case actions.APPLY_LOGOUT_SUCCESS:
            return logoutSuccess(state,action)
        case actions.APPLY_LOGOUT_FAIL:
            return logoutFail(state,action)
        default:
            return state
    }
}

export default reducer