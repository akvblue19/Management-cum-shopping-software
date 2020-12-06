import React,{Component}  from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import classes from './GetCategory.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class GetCategory extends Component{
    componentDidMount(){
        this.props.category(this.props.token,this.props.label)
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
                            <td>FIELD</td>
                            <td>VALUE</td>
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.details.map(data => (
                         <tr key = {data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
                            <td>{data.parent ? data.parent.id : 'N/A' }</td>
                            <td>{data.parent ? data.parent.name : 'N/A' }</td>
                            <td>{data.categoryMetadataFieldValues.map(da => (
                            <span>
                                {da.categoryMetadataField.name}||
                            </span>))}</td>
                            <td>{data.categoryMetadataFieldValues.map(da => (
                            <span>{da.value}||</span>
                            ))}</td>
                         </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        )
       
        let spin = null
        if(this.props.isLoading){
            spin = <Spinner/>
        }
        return(
            <div className={classes.Set}>
                <div className={classes.State}>
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
        label: state.auth.label,
        details: state.category.category,
        loading: state.category.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        category: (token,label) => dispatch(actions.categoryFetch(token,label))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetCategory)