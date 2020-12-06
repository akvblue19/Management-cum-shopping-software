import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState ={
    sellerData: [],
    customerData: [],
    error: null,
    loading: false,
}

const customerFetchStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const customerFetchSuccess = (state,action) => {
    return updatedObject(state, {
        customerData: action.customers,
        loading: false
    })
}

const customerFetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}

const sellerFetchStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const sellerFetchSuccess = (state,action) => {
    return updatedObject(state, {
        sellerData: action.sellers,
        loading: false
    })
}

const sellerFetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}




const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SELLER_FETCH_START:
            return sellerFetchStart(state,action)
        case actions.SELLER_FETCH_SUCCESS:
            return sellerFetchSuccess(state,action)
        case actions.SELLER_FETCH_FAIL:
            return sellerFetchFail(state,action)
        case actions.CUSTOMER_FETCH_START:
            return customerFetchStart(state,action)
        case actions.CUSTOMER_FETCH_SUCCESS:
            return customerFetchSuccess(state,action)
        case actions.CUSTOMER_FETCH_FAIL:
            return customerFetchFail(state,action)
        default:
            return state
    }
}

export default reducer