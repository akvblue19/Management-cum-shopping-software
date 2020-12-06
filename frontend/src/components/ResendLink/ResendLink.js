import React,{Component} from 'react'
import Input from '../UI/Input/Input'
import Button from '../UI/Button/Button'
import {updatedObject} from '../../shared/utility'
import classes from './ResendLink.module.css'
import axios from 'axios'
import Spinner from '../UI/Spinner/Spinner'


class ResendLink extends Component {
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
            }
        },
        isLoading: false,
        msg: null
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

    backHandler = (event) => {
        event.preventDefault()
        this.props.history.goBack();
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.setState({isLoading: true})
        axios({
            method: 'Post',
            url: 'http://localhost:8080/e-commerce/register/resend-link',
            params:{
                email: this.state.controls.email.value,
            },
            headers: {'Content-Type': 'application/json',
                }
            })
        .then(response => {
            this.setState({isLoading: false,
                msg: 'Check the mail'})
        }).catch( err => {
            this.setState({isLoading: false,
            msg: err.response.data.message})
        })
    }


    render(){
        let elementArray = [];
        for( let key in this.state.controls){
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        

        let element = elementArray.map(ele => (
            <Input
                key= {ele.id}
                elementType={ele.config.elementType}
                elementConfig={ele.config.elementConfig}
                value={ele.config.value}
                changed={(event) => this.inputChangedHandler(event,ele.id)}/>
          
        ))
        let data =  null
        if(this.state.isLoading){
            data = <Spinner/>
        }
        let content = null
        if(this.state.msg){
            content = <div className={classes.Data}>{this.state.msg}</div>
        }
        return(
            <div className={classes.Link}>
                {data}
                {content}
                <p>Please Enter Your Email.....</p>
                <form onSubmit = {this.submitHandler}>
                    {element}
                    <Button btnType ="Danger" clicked={this.submitHandler}>Submit</Button>
                    <Button btnType ="Success" clicked={this.backHandler}>Back</Button>
                </form>
            </div>
        )
    }
}

export default ResendLink