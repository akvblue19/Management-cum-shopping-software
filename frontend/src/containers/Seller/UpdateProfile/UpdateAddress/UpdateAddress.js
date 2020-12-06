import React,{Component} from 'react'
import classes from './UpdateAddress.module.css'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import {updatedObject} from '../../../../shared/utility'
import Input from '../../../../components/UI/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import {connect} from 'react-redux'
import * as actions from '../../../../store/action/index'
import { Redirect } from 'react-router'

class UpdateProfile extends Component{
    state = {
        controls: {
            addressId:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter Address unique id'
                },
                value: '',
                validation:{
                    required: true,
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
        refresh: false
    }

    componentDidMount(){
        this.props.address.map(da => {
            return da.addresses.map(add => {
            return this.setState({
                    controls: {
                        addressId:{
                            elementType: 'input',
                            elementConfig: {
                                type: 'text',
                                placeholder: 'Please enter Address unique id'
                            },
                            value: add.id,
                            validation:{
                                required: true,
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
                            value: add.city,
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
                            value: add.state,
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
                            value: add.country,
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
                            value: add.zipCode,
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
                            value: add.address,
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
                            value: add.label,
                            validation:{
                                required: true,
                            },
                            valid: false,
                            touched: false
                        },
                    }
            })
          
          })})
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
        this.props.onUpdate(this.state.controls.addressId.value, this.state.controls.city.value, 
        this.state.controls.state.value, this.state.controls.country.value, this.state.controls.address.value,
        this.state.controls.zipcode.value,this.state.controls.label.value, this.props.token, this.props.user)
        this.setState({refresh: true})
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
                {redirect}
                {spin}
                <p>Please Enter the Details</p>
                <form onSubmit={this.submitHandler}>
                    {detail}
                </form>
                <div>
                    <Button btnType ="Success" clicked={this.submitHandler}>Submit</Button>
                </div>
                
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return{ 
        token: state.auth.token,
        user: state.auth.label,
        loading: state.update.loading,
        address: state.profile.sellerData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onUpdate: (id,city,state, country, address, zipcode, label, token, user) => dispatch(actions.updateAddress(id,city,state, country, address, zipcode, label, token, user)),
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(UpdateProfile)