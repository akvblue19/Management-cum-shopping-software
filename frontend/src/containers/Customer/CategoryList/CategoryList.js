import React, {Component} from 'react'
import {connect} from 'react-redux'
import Category from './Category/Category'
import classes from './CategoryList.module.css'
import * as actions from '../../../store/action/index'

class CategoryList extends Component{
    showHandler = (id) => {
        this.props.categoryProd(this.props.token, id) 
        this.props.history.push('/category/product')
        
    }

    render(){
        return(
            <div className={classes.List}>
                <p>Available Categories</p>
                <Category show={this.showHandler}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
    }   
}

const mapDispatchToProps = dispatch => {
    return{
        categoryProd: (token, id) => dispatch(actions.categoryProduct(token,id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryList)