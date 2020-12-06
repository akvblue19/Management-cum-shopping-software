import React, {Component} from 'react'
import {updatedObject} from '../../shared/utility'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css'
import * as actions from '../../store/action/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
    state = {
        controls: {
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
        }
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
    
    signupCustomerHandler = () => {
        this.props.history.push('/signup/customer');
    }

    signupSellerHandler = () => {
        this.props.history.push('/signup/employee');
    }

    signinHandler = (event) => {
        event.preventDefault()
        this.setState({refresh: true})
        this.props.onAuth(this.state.controls.email.value,  this.state.controls.password.value)
    }

    resendHandler = (event) => {
        event.preventDefault()
        this.props.history.push('/resend-link');

    }

    forgotHandler = (event) => {
        event.preventDefault()
        this.props.history.push('/forgot/password')
    }



    render(){
        let authElementArray = [];
        for( let key in this.state.controls){
            authElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        

        let auth = authElementArray.map(authElement => (
            <Input
                key= {authElement.id}
                elementType={authElement.config.elementType}
                elementConfig={authElement.config.elementConfig}
                value={authElement.config.value}
                changed={(event) => this.inputChangedHandler(event,authElement.id)}/>
          
        ))

        let authRedirect = null
        if(this.props.isAuthenticated && !this.props.error){
            authRedirect = <Redirect to={this.props.onSetAuthRedirectPath()} />
        }
        
        let data = null
        if(this.props.error && this.state.refresh){
            data = <div className={classes.Data}><p>Please check the credentials login failed</p></div>
        }

        let pageContent = null
        if(this.props.loading){
            pageContent = <Spinner/>
        } 

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {pageContent}
                {data}
                <p>Please Enter the credentials for log in.....</p>
                <form onSubmit = {this.signinHandler}>
                    {auth}
                    <Button btnType ="Success">Sign In</Button>
                </form>
                <p>Click below Button if not have an account.....</p>
                <div>
                    <Button btnType="Danger" clicked= {this.signupCustomerHandler}>Sign up as Customer</Button>
                    <Button btnType="Danger" clicked= {this.signupSellerHandler}>Sign up as Employee</Button>
                </div>
                <div>
                    <Button btnType="Danger" clicked= {this.resendHandler}>Resend Activation Link</Button>
                    <Button btnType="Danger" clicked={this.forgotHandler}>Forgot Password..?</Button>
                </div>
                    
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        label: state.auth.label
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);