import React, {Component} from 'react'
import Input from '../../../../components/UI/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import {updatedObject} from '../../../../shared/utility'
import classes from './EditProfile.module.css'
import axios from 'axios'
import {connect} from 'react-redux'
import Spinner from '../../../../components/UI/Spinner/Spinner'

class EditProfile extends Component{
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
            }
        },
        refresh: false,
        loading: false,
        error: null
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
                    contactNo:{
                        elementType: 'input',
                        elementConfig: {
                            type: 'tel',
                            placeholder: 'Please enter your number'
                        },
                        value: da.contactNo,
                        validation:{
                            required: true,
                            isEmail: false
                        },
                        valid: false,
                        touched: false
                    },
            }})})
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

    // onAddressHandler = (event) => {
    //     event.preventDefault()
    //     this.props.history.push('/edit-profile/address')
       
    // }



    onSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({refresh: true,
        loading: true})
        axios({
            method: 'Put',
            url: 'http://13.68.230.39:8080/e-commerce/customer/home/update-profile',
            data:{
            firstName: this.state.controls.firstName.value,
            lastName:  this.state.controls.lastName.value,
            contactNo: this.state.controls.contactNo.value
            },
            headers: {'Content-Type': 'application/json',
                    'Authorization' : `Bearer ${this.props.token}`
                }
            })
        .then(response => {
            
            this.setState({refresh: true,
            loading: false})
        }).catch( err => {
            this.setState({refresh: true,
            loading: false,
            error: err.response.data.message})
        })
    }


    render(){

        let editDetailElementArray = [];
        for( let key in this.state.controls){
            editDetailElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }


        let editDetail = editDetailElementArray.map(editDetailElement => (
            <Input
                key= {editDetailElement.id}
                elementType={editDetailElement.config.elementType}
                elementConfig={editDetailElement.config.elementConfig}
                value={editDetailElement.config.value}
                changed={(event) => this.inputChangedHandler(event,editDetailElement.id)}/>
          
        ))
        let content = null
        if(this.state.loading){
            content=<Spinner/>
        }
        let error = null
        if(this.state.error && this.state.refresh){
         error = <div className={classes.Data}>{this.state.error}</div>
        } 
        if(!this.state.error && this.state.refresh){
            error = <div className={classes.Data}>Successfully Updated</div>
        }

        return(
            <div className={classes.EditProfile}>
                {content}
                {error}
                <p>Please Enter the Details</p>
                    <form>
                        {editDetail}
                    <div>
                        <Button btnType ="Success" clicked={this.onSubmitHandler}>Submit</Button>
                        {/* <Button btnType ="Danger" clicked={this.onAddressHandler}>Edit Address</Button> */}
                    </div>
                </form>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        data: state.profile.profileData,

    }
}

export default connect(mapStateToProps)(EditProfile)