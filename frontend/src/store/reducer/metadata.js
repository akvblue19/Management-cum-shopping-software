import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    metadata: [],
    isLoading: false,
    error: null
}

const metadataFieldStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const metadataFieldSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        isLoading: false
    })
}

const metadataFieldFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

const metadataFetchStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const metadataFetchSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        metadata: action.data,
        isLoading: false
    })
}

const metadataFetchFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

const metadataValueStart = (state,action) => {
    return updatedObject(state, {error: null, isLoading: true})
}

const metadataValueSuccess = (state,action) => {
    return updatedObject(state, {
        error: null,
        isLoading: false
    })
}

const metadataValueFail = (state,action) => {
    return updatedObject(state, {
        error: action.error,
        isLoading: false
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.METADATA_FIELD_POST_START:
            return metadataFieldStart(state,action)
        case actions.METADATA_FIELD_POST_SUCCESS:
            return metadataFieldSuccess(state,action)
        case actions.METADATA_FIELD_POST_FAIL:
            return metadataFieldFail(state,action)
        case actions.METADATA_FIELD_VALUE_POST_START:
            return metadataValueStart(state,action)
        case actions.METADATA_FIELD_VALUE_POST_SUCCESS:
            return metadataValueSuccess(state,action)
        case actions.METADATA_FIELD_VALUE_POST_FAIL:
            return metadataValueFail(state,action)
        case actions.METADATA_FIELD_FETCH_START:
            return metadataFetchStart(state,action)
        case actions.METADATA_FIELD_FETCH_SUCCESS:
            return metadataFetchSuccess(state,action)
        case actions.METADATA_FIELD_FETCH_FAIL:
            return metadataFetchFail(state,action)
        default:
            return state
    }
}

export default reducer