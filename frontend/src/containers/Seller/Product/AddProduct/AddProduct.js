import React,{Component} from 'react'
import classes from './AddProduct.module.css'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import {updatedObject} from '../../../../shared/utility'
import Input from '../../../../components/UI/Input/Input'
import Button from '../../../../components/UI/Button/Button'
import {connect} from 'react-redux'
import * as actions from '../../../../store/action/index'

class AddProduct extends Component{
    state = {
        controls: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter name of product'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            brand:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter the brand'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            description:{
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter your description'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            categoryId:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter category Id'
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

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({
            isSignup: true,
            refresh: true
        })
        this.props.onAdd(this.state.controls.name.value, this.state.controls.brand.value, 
        this.state.controls.description.value, this.state.controls.categoryId.value, this.props.token)
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
        let msg = null
        if(this.state.refresh && !this.props.loading){
            msg = <div className={classes.Green}><p>{this.props.msg}</p></div>
        }
        let error = null  
        if(this.state.refresh && !this.props.loading){
            error = <div className={classes.RED}><p>{this.props.error}</p></div>
        }
        return(
            <div className={classes.Product}>
                {msg}
                {error}
                {spin}
                <p>Please Enter the Details</p>
                <form onSubmit={this.submitHandler}>
                    {detail}
                    <Button btnType ="Success" clicked={this.submitHandler}>Submit</Button>
                </form>
            </div>
        )
    }
}
const mapStatetoProps = state => {
    return{ 
        token: state.auth.token,
        loading: state.product.loading,
        msg: state.product.msg,
        error: state.product.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onAdd: (name,brand,description,categoryId, token) => dispatch(actions.productPost(name, brand, description, categoryId, token)),
    }
}


export default connect(mapStatetoProps,mapDispatchToProps)(AddProduct)