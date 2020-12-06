import React,{Component} from 'react'
import classes from './ConfirmAccount.module.css'
import axios from 'axios'


class ConfirmAccount extends Component{

    componentDidMount() {
        let params = new URLSearchParams(document.location.search.substring(1));
        let token = params.get('token')
        axios({
            method: 'Get',
            url: 'http://13.68.230.39:8080/e-commerce/register/confirm-account',
            params:{
                token: token
            },
            headers: {'Content-Type': 'application/json',
                }
            })
        .then(response => {
        }).catch( err => {
        })
    }


    render(){
        return(
            <div className={classes.Confirm}>
               <p><strong>User Successfully Activated Login to Proceed Further......</strong></p>
            </div>
        )
    }

}

export default ConfirmAccount