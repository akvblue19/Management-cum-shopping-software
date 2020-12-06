import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    profileData: [],
    addressData:[],
    loading: false,
    error: null,
    success: null
}

const updateStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const updateSuccess = (state,action) => {
    return updatedObject(state, {
        loading: false,
        success: action.data
    })
}

const updateFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.UPDATE_START:
            return updateStart(state,action)
        case actions.UPDATE_SUCCESS:
            return updateSuccess(state,action)
        case actions.UPDATE_FAIL:
            return updateFail(state,action)
        default:
            return state
    }
}

export default reducer