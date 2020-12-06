import React, {Component} from 'react'
import {updatedObject} from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './SellerSignUp.module.css'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/action/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'

class SellerDetail extends Component {
    state = {
        controls: {
            firstName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your first name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            middleName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your middle name'
                },
                value: '',
                validation:{
                    required: false,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            lastName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your last name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            companyContact:{
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Please enter your number'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            email:{
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Please enter your email'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            profile:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of file'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            confirmPassword:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'confirm Password'
                },
                value: '',
                validation:{
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            companyName:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your company name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            gst:{
                elementType: 'input',
                elementConfig: {
                    type: 'tel',
                    placeholder: 'Please enter gst'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
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
            states:{
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
            }
        },
        isSignup: false,
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

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            isSignup: true,
            refresh: true
        })
        this.props.sellerData(
            this.state.controls.firstName.value,
            this.state.controls.middleName.value,
            this.state.controls.lastName.value,
            this.state.controls.companyContact.value,
            this.state.controls.email.value,
            this.state.controls.profile.value,
            this.state.controls.password.value,
            this.state.controls.confirmPassword.value,
            this.state.controls.companyName.value,
            this.state.controls.gst.value,
            this.state.controls.city.value,
            this.state.controls.states.value,
            this.state.controls.country.value,
            this.state.controls.zipcode.value,
            this.state.controls.address.value,
            this.state.controls.label.value)
    }

    render(){
        let detailElementArray = [];
        for( let key in this.state.controls){
            detailElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let detail = detailElementArray.map(detailElement => (
            <Input
                key= {detailElement.id}
                elementType={detailElement.config.elementType}
                elementConfig={detailElement.config.elementConfig}
                value={detailElement.config.value}
                changed={(event) => this.inputChangedHandler(event,detailElement.id)}/>
          
        ))
        let homePath = null
        if(this.state.isSignup && !this.props.loading && !this.props.error){
            homePath = <Redirect to = "/login" /> 
        }
        let data = null
        if(this.props.error && this.state.refresh){
            data = <div className={classes.Data}><p>{this.props.error}</p></div>
        }
        let spinner = null
        if(this.props.loading && !this.props.error){
            spinner = <div><Spinner/></div>
        }
        return(
            <div className={classes.Detail}>
                {homePath}
                {data}
                {spinner}
                <p>Please Enter the Details</p>
                <form onSubmit={this.submitHandler}>
                    {detail}
                    <Button btnType ="Success">Submit</Button>
                </form>
                
            </div>
        )
    }
}


const mapStatetoProps = state => {
    return{ 
        loading: state.signup.isLoading,
        data: state.signup.data,
        error: state.signup.error
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        sellerData: (firstName,middleName,lastName,companyContact,email,profile,password,confirmPassword,companyName,gst,city
            ,states,country,zipcode,address,label) => dispatch(actions.sellerSignup(firstName,middleName,lastName,companyContact,email,profile,password,confirmPassword,companyName,gst,city
                ,states,country,zipcode,address,label))
    }
}
export default connect(mapStatetoProps,mapDispatchToProps)(SellerDetail)