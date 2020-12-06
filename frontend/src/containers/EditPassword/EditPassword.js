import React,{Component} from 'react'
import {connect} from 'react-redux'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import {updatedObject} from '../../shared/utility'
import classes from './EditPassword.module.css'
import * as actions from '../../store/action/index'
import Spinner from '../../components/UI/Spinner/Spinner'

class EditPassword extends Component{
    state = {
        controls: {
            password:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'new password'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            confirmPassword:{
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'confirmPassword'
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
        isUpdated: false,
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
    

    onsubmitHandler = (event) => {
        event.preventDefault()
        this.setState({refresh: true})
        this.props.update(this.props.token,this.props.label,this.state.controls.password.value,
            this.state.controls.confirmPassword.value)
    }



    render(){
        let passwordElementArray = [];
        for( let key in this.state.controls){
            passwordElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        

        let reset = passwordElementArray.map(passwordElement => (
            <Input
                key= {passwordElement.id}
                elementType={passwordElement.config.elementType}
                elementConfig={passwordElement.config.elementConfig}
                value={passwordElement.config.value}
                changed={(event) => this.inputChangedHandler(event,passwordElement.id)}/>
          
        ))
        let content = null
        if(this.state.isUpdated && !this.state.isLoading){
            content = <p><strong>Password Updated Successfully</strong></p>
        }
        let spin = null
        if(this.props.isLoading){
            spin = <Spinner/>
        }
        let msg = null
        if(this.props.msg && this.state.refresh){
            msg = this.props.msg
        }
        return (
            <div className={classes.Edit}>
                <div className={classes.Spinner}>
                    {spin}
                    <div className={classes.Red}>{msg}</div>
                </div>
                <p>Please Enter the Password .....</p>
                <form onSubmit = {this.onsigninHandler}>
                    {reset}
                    <Button btnType ="Success" clicked={this.onsubmitHandler}>Submit</Button>
                </form>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        label: state.auth.label,
        isLoading: state.update.loading,
        msg: state.update.success,
    }
}

const mapDispatchToProps = dispatch => {
    return{
        update: (token,label,password,confirmPassword) => dispatch(actions.updatePassword(token,label,password,confirmPassword))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(EditPassword)