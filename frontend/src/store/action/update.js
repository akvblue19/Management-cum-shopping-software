import * as actions from './actionTypes'
import axios from 'axios'

export const updateStart = () => {
    return{
        type: actions.UPDATE_START
    }
}


export const updateSuccess = (data) => {
    return{
        type: actions.UPDATE_SUCCESS,
        data: data
    }
}


export const updateFail = (error) => {
    return{
        type: actions.UPDATE_FAIL,
        error: error
    }
}

export const update = (fName,lName,companyContact,companyName,gst,token) => {
    return dispatch => {
        dispatch(updateStart())
        axios({
            method: 'put',
            url: 'http://127.0.0.1:8080/e-commerce/seller/home/update-profile',
            data:{
                firstName: fName,
                lastName: lName,
                companyContact: companyContact,
                companyName: companyName,
                gst: gst
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            const fetchedData = [];
            fetchedData.push(response.data)
            dispatch(updateSuccess(fetchedData))
        }).catch( err => {
            dispatch(updateFail(err.response.data.message))
        })
    }
}


export const updatePassword = (token,label,password,confirmPassword) => {
    return dispatch => {
        dispatch(updateStart())
        axios({
            method: 'Put',
            url: `http://127.0.0.1:8080/e-commerce/${label}/home/reset-password`,
            params:{
                password: password,
                confirmPassword: confirmPassword
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            dispatch(updateSuccess(response.data))
        }).catch( err => {
            dispatch(updateFail(err.response.data.message))
        })
    }
}
    
export const updateAddress = (id,city,state, country, address, zipcode, label, token, user) => {
    return dispatch => {
        dispatch(updateStart())
        axios({
            method: 'Put',
            url: `http://127.0.0.1:8080/e-commerce/${user}/home/update-address/${id}`,
            data:{
                state: state,
                city: city,
                country: country,
                address: address,
                zipCode: zipcode,
                label: label
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            dispatch(updateSuccess(response.data))
        }).catch( err => {
            dispatch(updateFail(err.response.data.message))
        })
    }
}

export const updateProduct = (token, id, name, description) => {
    return dispatch => {
        dispatch(updateStart())
        axios({
            method: 'put',
            url: `http://127.0.0.1:8080/e-commerce/seller/home/update-product/${id}`,
            data:{
                name: name,
                description: description,
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${token}`
                }
            })
        .then(response => {
            dispatch(updateSuccess(response.data))
        }).catch( err => {
            dispatch(updateFail(err.response.data.message))
        })
    }
}
