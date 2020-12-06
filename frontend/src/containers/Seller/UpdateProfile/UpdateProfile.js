import React,{Component} from 'react'
import classes from './UpdateProfile.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {updatedObject} from '../../../shared/utility'
import Input from '../../../components/UI/Input/Input'
import Button from '../../../components/UI/Button/Button'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import * as actions from '../../../store/action/index'

class UpdateProfile extends Component{
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
                    placeholder: 'Please enter your company number'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
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
                },
                valid: false,
                touched: false
            },
            gst:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your company gst pin'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            },
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

    componentDidMount() {
        this.props.data.map(da => {
           return this.setState({
                controls: {
                    firstName:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Please enter your first name'
                        },
                        value: da.firstName,
                        validation:{
                            required: true,
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
                        value: da.lastName,
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
                            placeholder: 'Please enter your company number'
                        },
                        value: da.companyContact,
                        validation:{
                            required: true,
                            isEmail: false
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
                        value: da.companyName,
                        validation:{
                            required: true,
                        },
                        valid: false,
                        touched: false
                    },
                    gst:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'text',
                            placeholder: 'Please enter your company gst pin'
                        },
                        value: da.gst,
                        validation:{
                            required: true,
                        },
                        valid: false,
                        touched: false
                    }
            }})})
    }
    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            isSignup: true,
            refresh: true
        })
        this.props.onUpdate(this.state.controls.firstName.value, this.state.controls.lastName.value, 
        this.state.controls.companyContact.value, this.state.controls.companyName.value, this.state.controls.gst.value, this.props.token)
    }

    redirectHandler = (event) =>{
        event.preventDefault()
        this.props.history.push('/update-seller-address')
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
        let spin =null
        if(this.props.loading){
            spin = <div className={classes.Update}>
                        <Spinner/>
                    </div>
        }    
        let redirect
        if(this.state.refresh && !this.props.loading){
            redirect = <Redirect to="/updated"/>
        }
        return(
            <div className={classes.Update}>
                {spin}
                {redirect}
                <p>Please Enter the Details</p>
                <form onSubmit={this.submitHandler}>
                    {detail}
                </form>
                <div>
                    <Button btnType ="Success" clicked={this.submitHandler}>Submit</Button>
                    <Button btnType="Danger" clicked={this.redirectHandler}>Update Address</Button>
                </div>
                
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return{ 
        token: state.auth.token,
        loading: state.update.loading,
        data: state.profile.sellerData,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdate: (firstName,lastName, companyContact,companyName, gst, token) => dispatch(actions.update(firstName, lastName, companyContact, companyName, gst, token)),
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(UpdateProfile)