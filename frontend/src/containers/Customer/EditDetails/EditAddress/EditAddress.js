import React,{Component} from 'react'
import {connect} from 'react-redux'
import Spinner from '../../../../components//UI/Spinner/Spinner'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'
import classes from './EditAddress.module.css'
import {updatedObject} from '../../../../shared/utility'
import {Redirect} from 'react-router'
import axios from 'axios'

class EditAddress extends Component {
    state = {
        controls: {
            city:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of the city'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            state:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of the state'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            country:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of the country'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            zipcode:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your ZipCode'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            address:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter the address'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            label:{
                elementType: 'select',
                elementConfig: {
                    options:[
                        {value: 'home', displayValue: 'Home'},
                        {value: 'work', displayValue: 'Work'}
                    ]
                },
                value: 'home',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
            
        },
        isUpdated: false,
        isLoading: false,
        error: null,
        success: null, 
        refresh: false
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updatedObject(this.state.controls,{
            [controlName]: updatedObject(this.state.controls[controlName],{
                value: event.target.value,
            })
        }) 
       this.setState({
           controls: updatedControls
       })
    }

    onSubmitHandler = (addressId) => {
        this.setState({
            refresh: true,
            isLoading: true,
            error: null,
            success: null
        })
        axios({
            method: 'Put',
            url: `http://13.68.230.39:8080/e-commerce/customer/home/update-address/${addressId}`,
            data:{
                state: this.state.controls.state.value,
                city: this.state.controls.city.value,
                country: this.state.controls.country.value,
                address: this.state.controls.address.value,
                zipCode: this.state.controls.zipcode.value,
                label: this.state.controls.label.value
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.props.token}`
                }
            })
        .then(response => {
            this.setState({
                refresh: true,
                isLoading: false,
                success: response.data
            })
        }).catch( err => {
            this.setState({
                isLoading: false,
                error: err.response.data.message,
                refresh: true
            })
        })
    }

    render(){
        let addressElementArray = [];
        for( let key in this.state.controls){
            addressElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let address = addressElementArray.map(addressElement => (
            <Input
                key= {addressElement.id}
                elementType={addressElement.config.elementType}
                elementConfig={addressElement.config.elementConfig}
                value={addressElement.config.value}
                changed={(event) => this.inputChangedHandler(event,addressElement.id)}/>
          
        ))
        let spin = null
        if(this.state.isLoading){
            spin = <Spinner/>
        }

        let error = null
        if(this.state.error && this.state.refresh && !this.state.isLoading){
            error = <div className={classes.Data}><p>{this.state.error}</p></div>
        }
        let success = null 
        if(this.state.success){
            success = <div className={classes.Data}><p>{this.state.success}</p></div>
        }

        let content = null
        if(!this.state.isUpdated)
        {
            content =(
                <div className={classes.Detail}>
                    {spin}
                    {error}
                    {success}
                    <p>Please Enter the Address Detail For Updation</p>
                    <form>
                        {address}
                    </form>
                        {this.props.addressData.map(address => (
                         <ul key={address.id}>
                        <li><span>{address.state}</span></li>
                        <li><span>{address.city}</span></li>
                        <li><span>{address.country}</span></li>
                        <li><span>{address.address}</span></li>
                        <li><span>{address.zipCode}</span></li>
                        <li><span>{address.label}</span></li>
                        <div>
                            <Button btnType = "Danger" clicked={this.onSubmitHandler.bind(this, address.id)}>Update Address {address.label}</Button>
                        </div>
                     </ul>
                    ))}
                    
                    
                </div>
            ) 
        }else{
            content = <Redirect to= "/updated"/>
        }
        return content
    }
}

const mapSateToProps = state => {
    return{
        token: state.auth.token,
        addressData: state.profile.addressData
    }
}


export default connect(mapSateToProps)(EditAddress)