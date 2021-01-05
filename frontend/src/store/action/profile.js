import * as actions from './actionTypes'
import axios from 'axios'

export const fetchStart = () => {
    return{
        type: actions.PROFILE_FETCH_START
    }
}


export const fetchSuccess = (fetchedData) => {
    return{
        type: actions.PROFILE_FETCH_SUCCESS,
        data: fetchedData
    }
}


export const fetchFail = () => {
    return{
        type: actions.PROFILE_FETCH_FAIL,
    }
}

export const fetch = (token) => {
    return dispatch => {
        dispatch(fetchStart())
        axios({
            method: 'Get',
            url: 'http://127.0.0.1:8080/e-commerce/customer/home/user-profile',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetchedData = [];
            fetchedData.push(response.data)
            dispatch(fetchSuccess(fetchedData))
        }).catch( err => {
            dispatch(fetchFail())
        })
    }
}

export const addressFetchStart = () => {
    return{
        type: actions.ADDRESS_FETCH_START
    }
}


export const addressFetchSuccess = (fetchedData) => {
    return{
        type: actions.ADDRESS_FETCH_SUCCESS,
        data: fetchedData
    }
}


export const addressFetchFail = () => {
    return{
        type: actions.ADDRESS_FETCH_FAIL,
    }
}


export const addressFetch = (token) => {
    return dispatch => {
        dispatch(addressFetchStart())
        axios({
            method: 'Get',
            url: 'http://127.0.0.1:8080/e-commerce/customer/home/get-address',
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then(response => {
                let fetchedData = [];
                fetchedData = [...response.data]
                dispatch(addressFetchSuccess(fetchedData))
            }).catch( err => {
                dispatch(addressFetchFail())
            })
    }
}



export const sellerProfileStart = () => {
    return{
        type: actions.SELLER_PROFILE_FETCH_START
    }
}


export const sellerProfileSuccess = (fetchedData) => {
    return{
        type: actions.SELLER_PROFILE_FETCH_SUCCESS,
        data: fetchedData
    }
}


export const sellerProfileFail = () => {
    return{
        type: actions.SELLER_PROFILE_FETCH_FAIL
    }
}
export const sellerFetch = (token) => {
    return dispatch => {
        dispatch(sellerProfileStart())
        axios({
            method: 'Get',
            url: 'http://127.0.0.1:8080/e-commerce/seller/home/user-profile',
            headers: {'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetchedData = [];
            fetchedData.push(response.data)
            dispatch(sellerProfileSuccess(fetchedData))
        }).catch( err => {
            dispatch(sellerProfileFail())
        })
    }
}
