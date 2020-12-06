import React, {Component} from 'react'
import {updatedObject} from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import classes from './CustomerDetail.module.css'
import {Redirect} from 'react-router-dom'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'

class Detail extends Component {
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
            profile:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of file'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            contactNo:{
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
        this.props.onsignUp(this.state.controls.email.value, this.state.controls.password.value, 
        this.state.controls.confirmPassword.value, this.state.controls.firstName.value, this.state.controls.middleName.value,
        this.state.controls.profile.value, this.state.controls.lastName.value, this.state.controls.contactNo.value)
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
        if(this.props.loading){
            data = <Spinner/>
        }

        if(this.props.error && this.state.refresh){
            data = <div className={classes.Data}><p>{this.props.error}</p></div>
        }
        return(
            <div className={classes.Detail}>
                {homePath}
                {data}
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

const mapDispatchToProps = dispatch => {
    return{
        onsignUp: (email,password, confirmPassword,firstName,middleName,profile,lastName,contactNo) => dispatch(actions.signup(email,password, confirmPassword,firstName,middleName,profile,lastName,contactNo)),
    }
}

export default connect(mapStatetoProps, mapDispatchToProps)(Detail)