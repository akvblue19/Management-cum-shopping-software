import React, {Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../../../components/UI/Button/Button'
import classes from './CustomerAddress.module.css'
import * as actions  from '../../../../store/action/index'
import axios from 'axios'
import { Redirect } from 'react-router'

class CustomerAddress extends Component {
    state = {
        dataDeleted: false,
        redirect: false
    }

    componentDidMount(){
        this.props.fetchAddress(this.props.token)
        
    }

    deleteHandler = addressId => {
        axios({
            method: 'Delete',
            url: `http://13.68.230.39:8080/e-commerce/customer/home/delete-address/${addressId}`,
            headers: {
                    'Authorization' : `Bearer ${this.props.token}`
                }
        })
        .then(response => {
            this.setState({data: true})
        }).catch(error => {
        });
    }

    updateHandler = (event) => {
        event.preventDefault()
        this.setState({
            redirect: true
        })
    }

      

    render(){
           let content = null
           if(this.state.data){
              content = <Redirect to="/updated" />
           } 
           if(this.state.redirect){
               content = <Redirect to="/edit-address" />
           }
           if(!this.state.data && !this.state.redirect){
              content = (
                <div className={classes.CustomerAddress}>
                <div className={classes.Head}><strong>I Got My Provided Address</strong></div>
                 {this.props.addressData.map(address => (
                    <ul key={address.id}>
                        <li><span>{address.state}</span></li>
                        <li><span>{address.city}</span></li>
                        <li><span>{address.country}</span></li>
                        <li><span>{address.address}</span></li>
                        <li><span>{address.zipCode}</span></li>
                        <li><span>{address.label}</span></li>
                        <div>
                            <Button btnType = "Danger" clicked={this.deleteHandler.bind(this, address.id)}>Delete Address</Button>
                            <Button btnType = "Danger" clicked={this.updateHandler}>Update Address</Button>
                        </div>
                    </ul>
                    ))}
            </div>
              )
           }
        return content
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        addressData: state.profile.addressData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchAddress: (token) => dispatch(actions.addressFetch(token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAddress)
