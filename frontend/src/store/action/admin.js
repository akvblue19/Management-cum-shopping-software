import * as actionTypes from './actionTypes'
import axios from 'axios'

export const sellerFetchStart = () => {
    return{
        type: actionTypes.SELLER_FETCH_START
    }
}

export const sellerFetchSuccess = (sellers) => {
    return{
        type: actionTypes.SELLER_FETCH_SUCCESS,
        sellers: sellers
    }
}

export const sellerFetchFail = () => {
    return{
        type: actionTypes.SELLER_FETCH_FAIL
    }
}

export const seller =  (token) => {
    return dispatch => {
        dispatch(sellerFetchStart())
        axios({
            method: 'Get',
            url: 'http://127.0.0.1:8080/e-commerce/admin/home/sellers/0',
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetcedSellers = [];
            for( let key in response.data){
                fetcedSellers.push({
                    ...response.data[key],
                    
                })
            }
            dispatch(sellerFetchSuccess(fetcedSellers))
        }).catch( err => {
            dispatch(sellerFetchFail())
        })
    }
}


export const customerFetchStart = () => {
    return{
        type: actionTypes.CUSTOMER_FETCH_START
    }
}

export const customerFetchSuccess = (customers) => {
    return{
        type: actionTypes.CUSTOMER_FETCH_SUCCESS,
        customers: customers
    }
}

export const customerFetchFail = () => {
    return{
        type: actionTypes.CUSTOMER_FETCH_FAIL
    }
}

export const customer =  (token) => {
    return dispatch => {
        dispatch(customerFetchStart())
        axios({
            method: 'Get',
            url: 'http://127.0.0.1:8080/e-commerce/admin/home/customers/0',
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetcedCustomers = [];
            for( let key in response.data){
                fetcedCustomers.push({
                    ...response.data[key],
                    
                })
            }
            dispatch(customerFetchSuccess(fetcedCustomers))
        }).catch( err => {
            dispatch(customerFetchFail())
        })
    }
}