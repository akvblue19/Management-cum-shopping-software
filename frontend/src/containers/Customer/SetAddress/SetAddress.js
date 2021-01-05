import React,{Component} from 'react'
import {updatedObject} from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './SetAddress.module.css'
import axios from 'axios'
import {connect} from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'

class SetAddress extends Component {
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
        refresh: false,
        success: null
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

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({
            isLoading: true,
            refresh: true,
            error: null,
            success: null
        })
        axios({
            method: 'Post',
            url: 'http://127.0.0.1:8080/e-commerce/customer/home/save-address',
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
                isLoading: false,
                refresh: true,
                error: null,
                success: response.data
            })
        }).catch( err => {
            this.setState({
                isLoading: false,
                refresh: true,
                error: err.response.data.message
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

        let err = null 
        if(this.state.error && this.state.refresh){
        err = <div className={classes.Data}><p>{this.state.error}</p></div>
        }
        let success = null
        if(this.state.success){
        success = <div className={classes.Data}><p>{this.state.success}</p></div>
        }
        let content = null
        if(this.state.isLoading && this.state.refresh)
        {
            content = <div className={classes.Spin}><Spinner/></div>
        }
        return (
                <div className={classes.Detail}>
                    {err}
                    {content}
                    {success}
                    <p>Please Enter the Address Detail</p>
                    <form>
                        {address}
                        <Button btnType ="Success" clicked={this.onSubmitHandler}>Submit</Button>
                    </form>
                    
                </div>
            )  
    }
}

const mapSateToProps = state => {
    return{
        token: state.auth.token,
        addressData: state.profile.addressData
    }
}

export default connect(mapSateToProps)(SetAddress)