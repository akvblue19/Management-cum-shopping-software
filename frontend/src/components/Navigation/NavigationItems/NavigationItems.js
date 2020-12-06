import React,{Component} from 'react';
import classes from './NavigationItems.module.css'
import NavigationItem from './NavigationItem/NavigationItem'
import {connect} from 'react-redux'

class NavigationItems extends Component{
    render(){
        let content = null
        content =(
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {this.props.isAuth 
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/login" >Login</NavigationItem>}
            </ul>)
        if(this.props.label==='admin'){
            content = (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {this.props.isAuth 
            ? <NavigationItem link="/admin/sellers" >All Employee</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/admin/customers" >All Customers</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/all-product" >Inventory</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/get-metadata" >Get MetaData</NavigationItem>
            : null}
             {this.props.isAuth 
            ? <NavigationItem link="/add-metadata" >Add MetaData Field</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/get-category" >Get Category</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/add-category" >Add Category</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/login" >Login</NavigationItem>}
            </ul>)
        }
         if(this.props.label==='customer'){
            content = (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {this.props.isAuth
            ? <NavigationItem link="/my-profile" >My Profile</NavigationItem>
            : null}
            {this.props.isAuth
            ? <NavigationItem link="/customer/category" >All Category</NavigationItem>
            : null}
             {this.props.isAuth 
            ? <NavigationItem link="/add-address" >Add Address</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/edit-profile" >Edit Profile</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/edit-address" >Edit Address</NavigationItem>
            : null}
             {this.props.isAuth
            ? <NavigationItem link="/edit-password" >ResetPassword</NavigationItem>
            : null}
            {this.props.isAuth 
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/login" >Login</NavigationItem>}
        </ul>)}
        if(this.props.label==='seller'){
            content = (
            <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>Home</NavigationItem>
            {this.props.isAuth
            ? <NavigationItem link="/seller-profile" >My Profile</NavigationItem>
            : null }
            {this.props.isAuth
            ? <NavigationItem link="/updaet-seller-profile" >Update Profile</NavigationItem>
            : null }
            {this.props.isAuth
            ? <NavigationItem link="/update-seller-address" >Update Address</NavigationItem>
            : null }
            {this.props.isAuth
            ? <NavigationItem link="/edit-profile/password" >ResetPassword</NavigationItem>
            : null }
             {this.props.isAuth
            ? <NavigationItem link="/seller/products" >My Inventory</NavigationItem>
            : null}
            {this.props.isAuth
            ? <NavigationItem link="/get-category" >Get Category</NavigationItem>
            : null }
            {this.props.isAuth
            ? <NavigationItem link="/post/product" >Add Product</NavigationItem>
            : null }
            {this.props.isAuth
            ? <NavigationItem link="/add/product-variation" >Add variation</NavigationItem>
            : null }
             {this.props.isAuth 
            ? <NavigationItem link="/logout" >Logout</NavigationItem>
            : <NavigationItem link="/login" >Login</NavigationItem>}

        </ul>)}
        
        return content
    }
} 

const mapStateToProps = state => {
    return{
        label: state.auth.label
    }
}
export default connect(mapStateToProps)(NavigationItems)
    