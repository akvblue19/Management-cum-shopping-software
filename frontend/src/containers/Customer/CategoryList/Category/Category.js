import React,{Component} from  'react'
import * as actions from '../../../../store/action/index'
import Spinner from '../../../../components/UI/Spinner//Spinner'
import classes from './Category.module.css'
import {connect} from 'react-redux'
import Button from '../../../../components/UI/Button/Button'

class Category extends Component{
    state ={
        refresh: false
    }

    componentDidMount(){
        this.props.category(this.props.token)
    }

    submitHandler = (id) => {
        this.props.subCategory(this.props.token,id)
        this.setState({refresh: true})
    }

    render(){
        let category = null
        category = <Spinner/>
        if(!this.props.isLoading){
                category = this.props.categoryfetched.map(cat => (
                    <div className={classes.Cat} key={cat.id} >
                        <div className={classes.Category}>
                            <span onClick={this.props.show.bind(this,cat.id)}><h2>{cat.name}</h2></span>
                            <div className={classes.Clicker}>
                                <Button btnType="Danger" clicked={this.submitHandler.bind(this,cat.id)}>Sub-Category</Button>
                            </div>
                            
                        </div>
                    </div>
                
            ))
        }
        let subData = null
        if(!this.props.isLoading && this.state.refresh){
            subData = this.props.sub.map(subCat => (
                <div className={classes.Cat} key={subCat.id} >
                    <div className={classes.Category}>
                        <span onClick={this.props.show.bind(this,subCat.id)}><h2>{subCat.name}</h2></span>
                    </div>
                </div>
            
            ))
        }
        return(
            <div>
                {category}
                {subData}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        loading: state.category.isLoading,
        categoryfetched: state.category.category,
        sub: state.category.subData
    }
}

const mapDispatchToProps = dispatch => {
    return{
        category: (token) => dispatch(actions.categoryList(token)),
        subCategory: (token,id) => dispatch(actions.subCategoryList(token,id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Category)