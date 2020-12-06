import * as actionTypes from './actionTypes'
import axios from 'axios'

export const variationFetchStart = () => {
    return{
        type: actionTypes.PRODUCT_VARIATION_FETCH_START
    }
}

export const variationFetchSuccess = (products) => {
    return{
        type: actionTypes.PRODUCT_VARIATION_FETCH_SUCCESS,
        products: products
    }
}

export const variationFetchFail = () => {
    return{
        type: actionTypes.PRODUCT_VARIATION_FETCH_FAIL
    }
}


export const productVariation =  (id, token) => {
    return dispatch => {
        dispatch(variationFetchStart())
        axios({
            method: 'Get',
            url: `http://13.68.230.39:8080/e-commerce/customer/home/product-variation/${id}`,
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetcedProducts = [];
            fetcedProducts.push({
                ...response.data,
                
            })
            dispatch(variationFetchSuccess(fetcedProducts))
        }).catch( err => {
            dispatch(variationFetchFail())
        })
    }
}

export const similarProductStart = () => {
    return{
        type: actionTypes.SIMILAR_PRODUCT_START
    }
}

export const similarProductSuccess = (products) => {
    return{
        type: actionTypes.SIMILAR_PRODUCT_SUCCESS,
        products: products
    }
}

export const similarProductFail = () => {
    return{
        type: actionTypes.SIMILAR_PRODUCT_FAIL
    }
}

export const similar =  (id, token) => {
    return dispatch => {
        dispatch(similarProductStart())
        axios({
            method: 'Get',
            url: `http://13.68.230.39:8080/e-commerce/customer/home/similar-product/${id}`,
            headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetcedProducts = [];
                for( let key in response.data){
                    fetcedProducts.push({
                         ...response.data[key],
                                
                })}
            dispatch(similarProductSuccess(fetcedProducts))
        }).catch( err => {
            dispatch(similarProductFail())
        })
    }
}