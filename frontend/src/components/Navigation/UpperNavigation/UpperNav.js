import React,{Component} from 'react';
import classes from './UpperNav.module.css'
import Nav from './Nav/Nav'
import {connect} from 'react-redux'

class UpperNav extends Component{
    render(){
        let content = null
        content =(
        <ul className={classes.UpperNav}>
            <Nav link="/" exact><i className="fa fa-home" style={{fontSize: '24px'}}></i></Nav>
            {/* <Nav link="/cart" exact><i className="fa fa-shopping-cart" style={{fontSize: '24px',color: 'white'}}></i></Nav> */}
            {/* <Nav link="/notification" ><i className="fa fa-bell" style={{fontSize: '20px',margin: '2px',color: 'white'}}></i></Nav> */}
            {this.props.isAuth 
            ? <Nav link="/logout" >Logout</Nav>
            : <Nav link="/login" >Login</Nav>}
        </ul>)
        
        return content
    }
} 

const mapStateToProps = state => {
    return{
        label: state.auth.label
    }
}
export default connect(mapStateToProps)(UpperNav)
    