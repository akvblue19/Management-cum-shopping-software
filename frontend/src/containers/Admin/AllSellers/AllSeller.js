import React,{Component} from 'react'
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './AllSellers.module.css'
import axios from 'axios'
import Spinner from '../../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class AllSellers extends Component{
    state = {
        activate: false,
        deactivate: false,
        spinner: false
    }

    componentDidMount(){
        this.props.fetchSeller(this.props.token)
    }

    activateHandler = (sellerId) => {
        this.setState({
            spinner:true
        })
        axios({
            method: 'Put',
            url: `http://127.0.0.1:8080/e-commerce/admin/home/seller-activate/${sellerId}`,
            headers: {
                    'Authorization' : `Bearer ${this.props.token}`
                }
            })
            .then(response => {
                this.setState({
                activate: true,
                spinner: false
            })
            }).catch(error => {
                this.setState({
                    spinner: false
                })
        });
    }

    deActivateHandler = (sellerId) => {
        this.setState({
            spinner: true
        })
        axios({
            method: 'Put',
            url: `http://127.0.0.1:8080/e-commerce/admin/home/seller-de-activate/${sellerId}`,
            headers: {
                    'Authorization' : `Bearer ${this.props.token}`
                }
            })
            .then(response => {
                this.setState({
                    deactivate: true,
                    spinner: false
                })
            }).catch(error => {
                this.setState({
                    spinner: false
                })
        });
    }

    render(){
        let content = null
        content = (
            <div className = {classes.AllSellers}>
                
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>EMAIL</td>
                            <td>FIRST NAME</td>
                            <td>MIDDLE NAME</td>
                            <td>LAST NAME</td>
                            <td>COMPANY NAME</td>
                            <td>CONTACT NUMBER</td>
                            <td>IS_ACTIVE</td>
                            <td>ACTIVATE</td>
                            <td>DE-ACTIVATE</td>
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.sellers.map(seller => (
                         <tr key = {seller.id}>
                            <td>{seller.id}</td>
                            <td>{seller.email}</td>
                            <td>{seller.firstName}</td>
                            <td>{seller.middleName}</td>
                            <td>{seller.lastName}</td>
                            <td>{seller.companyName}</td>
                            <td>{seller.companyContact}</td>
                            <td>{String(seller.active)}</td>
                            <td><Button btnType="Success" clicked={this.activateHandler.bind(this,seller.id)}>Activate</Button></td>
                            <td><Button btnType="Danger" clicked={this.deActivateHandler.bind(this,seller.id)}>De-Activate</Button></td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        )
        let label = null
        if(this.state.activate){
            label = <Redirect to="/updated"/>
        }
        if(this.state.deactivate){
            label = <Redirect to="/updated"/>
        }
        if(this.state.spinner){
            content = <Spinner/>
        }
        return(
            <div className={classes.Set}>
                <p><strong>All Employee</strong></p>
                {label}
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        sellers: state.admin.sellerData,
        isLoading: state.admin.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchSeller: (token) => dispatch(actions.seller(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllSellers)