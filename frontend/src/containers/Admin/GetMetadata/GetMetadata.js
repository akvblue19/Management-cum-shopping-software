import React,{Component} from 'react'
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './GetMetadata.module.css'

class GetMetadata extends Component{
   

    componentDidMount(){
        this.props.fetchData(this.props.token)
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
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.metadata.map(data => (
                         <tr key = {data.id}>
                            <td>{data.id}</td>
                            <td>{data.name}</td>
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
                 <div className={classes.Spin}>
                    {spin}
                </div>
                <p><strong>Meta data Fields....</strong></p>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        metadata: state.metadata.metadata,
        isLoading: state.metadata.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: (token) => dispatch(actions.metadataFetch(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetMetadata)