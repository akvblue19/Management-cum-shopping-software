import * as actions from '../action/actionTypes'
import {updatedObject} from '../../shared/utility'

const initialState = {
    products: [],
    productFetched: [],
    productData: [],
    sellerProduct:[],
    msg: [],
    delete: null,
    loading: false,
    error: null,
    activity: false
}
// -----------------------------
const fetchStart = (state,action) => {
    return updatedObject(state, {error: null,products:[], loading: true})
}

const fetchSuccess = (state,action) => {
    return updatedObject(state, {
        products: action.products,
        loading: false
    })
}

const fetchFail = (state,action) => {
    return updatedObject(state, {error: action.error, loading: false})
}


const deleteStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const deleteSuccess = (state,action) => {
    return updatedObject(state, {
        deleted: action.del,
        loading: false
    })
}

const deleteFail = (state,action) => {
    return updatedObject(state, {loading: false})
}
// --------------------------------------
const adminfetchStart = (state,action) => {
    return updatedObject(state, {error: null,productFetched: [],loading: true})
}

const adminfetchSuccess = (state,action) => {
    return updatedObject(state, {
        productFetched: action.products,
        loading: false
    })
}

const adminfetchFail = (state,action) => {
    return updatedObject(state, {loading: false})
}
// -------------------------------
const sellerfetchStart = (state,action) => {
    return updatedObject(state, {error: null,sellerProduct: [],loading: true})
}

const sellerfetchSuccess = (state,action) => {
    return updatedObject(state, {
        sellerProduct: action.products,
        loading: false
    })
}

const sellerfetchFail = (state,action) => {
    return updatedObject(state, {loading: false})
}
// ---------------------------------------------
const productDataStart = (state,action) => {
    return updatedObject(state, {error: null,productData: [],loading: true})
}

const productDataSuccess = (state,action) => {
    return updatedObject(state, {
        productData: action.products,
        loading: false
    })
}

const productDataFail = (state,action) => {
    return updatedObject(state, { loading: false})
}

const productPostStart = (state,action) => {
    return updatedObject(state, {error: null, loading: true})
}

const productPostSuccess = (state,action) => {
    return updatedObject(state, {
        msg: action.message,
        loading: false
    })
}

const productPostFail = (state,action) => {
    return updatedObject(state, {error: action.err,loading: false})
}


const activityStart = (state,action) => {
    return updatedObject(state, {error: null,activity:false, loading: true})
}

const activitySuccess = (state,action) => {
    return updatedObject(state, {
        activity: action.data,
        loading: false
    })
}

const activityFail = (state,action) => {
    return updatedObject(state, {activity:false,loading: false})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.PRODUCT_FETCH_START:
            return fetchStart(state,action)
        case actions.PRODUCT_FETCH_SUCCESS:
            return fetchSuccess(state,action)
        case actions.PRODUCT_FETCH_FAIL:
            return fetchFail(state,action)

        case actions.PRODUCT_FETCH_START_ADMIN:
            return adminfetchStart(state,action)
        case actions.PRODUCT_FETCH_SUCCESS_ADMIN:
            return adminfetchSuccess(state,action)
        case actions.PRODUCT_FETCH_FAIL_ADMIN:
            return adminfetchFail(state,action)
            
        case actions.PRODUCT_DATA_FETCH_START:
            return productDataStart(state,action)
        case actions.PRODUCT_DATA_FETCH_SUCCESS:
            return productDataSuccess(state,action)
        case actions.PRODUCT_DATA_FETCH_FAIL:
            return productDataFail(state,action)

        case actions.PRODUCT_POST_START:
            return productPostStart(state,action)
        case actions.PRODUCT_POST_SUCCESS:
            return productPostSuccess(state,action)
        case actions.PRODUCT_POST_FAIL:
            return productPostFail(state,action)

        case actions.DELETE_PRODUCT_START:
            return deleteStart(state,action)
        case actions.DELETE_PRODUCT_SUCCESS:
            return deleteSuccess(state,action)
        case actions.DELETE_PRODUCT_FAIL:
            return deleteFail(state,action)

        case actions.ACTIVATE_START:
            return activityStart(state,action)
        case actions.ACTIVATE_SUCCESS:
            return activitySuccess(state,action)
        case actions.ACTIVATE_FAIL:
            return activityFail(state,action)

        case actions.SELLER_PRODUCT_START:
            return sellerfetchStart(state,action)
        case actions.SELLER_PRODUCT_SUCCESS:
            return sellerfetchSuccess(state,action)
        case actions.SELLER_PRODUCT_FAIL:
            return sellerfetchFail(state,action)
        default:
            return state
    }
}

export default reducer