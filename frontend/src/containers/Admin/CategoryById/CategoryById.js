import React,{Component} from 'react'
import GetCategory from './GetCategory/GetCategory'
import {connect } from 'react-redux'
import * as actions from '../../../store/action/index'
import classes from './CategoryById.module.css'
import {updatedObject} from '../../../shared/utility'
import Button from  '../../../components/UI/Button/Button'
import Input from '../../../components/UI/Input/Input'
import {Redirect} from 'react-router-dom'

class CategoryById extends Component {
    state = {
        controls: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter category name to update'
                },
                value: '',
                validation:{
                    required: true,
                },
                valid: false,
                touched: false
            }
        },
        form: false,
        update: false,
        refresh: false
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
   
    

    onSubmit = (id) => {
        this.setState({refresh: true})
        this.props.dataFetched(this.props.token,id)
    }

    onUpdate = (id) => {
        this.setState({update: true})
        this.props.dataUpdate(this.props.token,id,this.state.controls.name.value)
    }

    toggleHandle = () => {
        this.setState({
            form: !this.state.form
        })
    }
    render(){
        let authElementArray = [];
        for( let key in this.state.controls){
            authElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let data = <p>Please Enetr the Detail and Click on Update</p>            
        let auth =     
                authElementArray.map(authElement => (
                <Input
                    key= {authElement.id}
                    elementType={authElement.config.elementType}
                    elementConfig={authElement.config.elementConfig}
                    value={authElement.config.value}
                    changed={(event) => this.inputChangedHandler(event,authElement.id)}/>
              
            ))

        let content = null
        if(this.props.data.length>0){
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
                             {this.props.data.map(da => (
                             <tr key = {da.id}>
                                <td>{da.id}</td>
                                <td>{da.name}</td>
                            </tr>   
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }else{
            content = null
        }
        let show =null
        if(this.props.data.length > 0 && this.state.refresh){
            show = (
                <div className={classes.Data}>
                    <p><strong>Associated Data</strong></p>
                    <div className={classes.Sets}>
                        {content}   
                    </div>
                    
                </div>
            )
        }
        let error = null
        if(this.props.error){
            error = <div className={classes.Error}><p>{this.props.error}</p></div>
        }
        let shows = null
       if(this.state.form ){
        shows =
        <form className = {classes.Form}>
            {data}
            {error}
            {auth}
        </form>
       }
       let redirect = null
        if(this.state.update && this.props.update){
            redirect = <Redirect to="/updated"/>
        }
        return(
            <div>
                <div>
                    {redirect}
                    <GetCategory onSubmitHandler={this.onSubmit}
                                 onUpdateHandler={this.onUpdate}/>
                </div> 
                <div className={classes.Center}>
                 <Button btnType = "Danger" clicked={this.toggleHandle}>{this.state.form ? 'Hide Form': 'Show Form' }</Button>
                </div>
                {shows}
                <div>
                    {show}
                </div>
                
                
            </div>
            
        )
    }
}
const mapStateToProps = state => {
    return{
        token: state.auth.token,
        data: state.category.idData,
        isLoading: state.category.isLoading,
        error: state.category.error,
        update: state.category.update

    }
}

const mapDispatchToProps = dispatch => {
    return{
        dataFetched: (token, id) => dispatch(actions.categoryFetchById(token,id)),
        dataUpdate: (token,id,name) => dispatch(actions.categoryUpdate(token,id,name))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(CategoryById)
