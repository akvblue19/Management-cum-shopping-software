import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    profileData: [],
    sellerData: [],
    addressData:[],
    isLoading: false,
    error: null
}

const fetchStart = (state,action) => {
    return updatedObject(state, {profileData: [],error: null, loading: true})
}

const fetchSuccess = (state,action) => {
    return updatedObject(state, {
        profileData: action.data,
        loading: false
    })
}

const fetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const sellerfetchStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const sellerfetchSuccess = (state,action) => {
    return updatedObject(state, {
        sellerData: action.data,
        loading: false
    })
}

const sellerfetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const addressFetchStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const addressFetchSuccess = (state,action) => {
    return updatedObject(state, {
        addressData: action.data,
        loading: false
    })
}

const addressFetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.PROFILE_FETCH_START:
            return fetchStart(state,action)
        case actions.PROFILE_FETCH_SUCCESS:
            return fetchSuccess(state,action)
        case actions.PROFILE_FETCH_FAIL:
            return fetchFail(state,action)
        case actions.SELLER_PROFILE_FETCH_START:
            return sellerfetchStart(state,action)
        case actions.SELLER_PROFILE_FETCH_SUCCESS:
            return sellerfetchSuccess(state,action)
        case actions.SELLER_PROFILE_FETCH_FAIL:
            return sellerfetchFail(state,action)
        case actions.ADDRESS_FETCH_START:
            return addressFetchStart(state,action)
        case actions.ADDRESS_FETCH_SUCCESS:
            return addressFetchSuccess(state,action)
        case actions.ADDRESS_FETCH_FAIL:
            return addressFetchFail(state,action)
        default:
            return state
    }
}

export default reducer