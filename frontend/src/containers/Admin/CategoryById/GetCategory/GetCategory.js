import React,{Component} from 'react'
import * as actions from '../../../../store/action/index'
import {connect} from 'react-redux'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import classes from './GetCategory.module.css'
import Button from '../../../../components/UI/Button/Button'

class GetCategory extends Component{
   

    componentDidMount(){
        this.props.fetchData(this.props.token, this.props.user)
    }


    render(){
        let content = null

        content = (
            <div className = {classes.Data}>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>NAME</td>
                            <td>PARENT ID</td>
                            <td>PARENT NAME</td>
                            <td>FIELD NAME</td>
                            <td>VALUE NAME</td>
                            <td>VIEW DETAILS</td>
                            <td>UPDATE DETAILS</td>
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.category.map(data => (
                         <tr key = {data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.parent ? data.parent.id : null }</td>
                            <td>{data.parent ? data.parent.name : null }</td>
                            <td>{data.categoryMetadataFieldValues.map(da => (
                            <span>
                                {da.categoryMetadataField.name}||
                            </span>))}</td>
                            <td>{data.categoryMetadataFieldValues.map(da => (
                            <span>{da.value}||</span>
                            ))}</td>
                            <td><Button btnType="Success" clicked={this.props.onSubmitHandler.bind(this,data.id)}>View</Button></td>
                            <td><Button btnType="Danger" clicked={this.props.onUpdateHandler.bind(this, data.id)}>Update</Button></td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        )
       
        let spin = null
        if(this.props.isLoading){
            spin = <div className={classes.Spin}><Spinner/></div>
        }
        return(
            <div className={classes.Set}>
                <div>
                    <p><strong>Category Data....</strong></p>
                    {content}
                </div>
                
                <div className={classes.Spin}>
                    {spin}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        user: state.auth.label,
        category: state.category.category,
        isLoading: state.category.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: (token, label) => dispatch(actions.categoryFetch(token, label))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetCategory)