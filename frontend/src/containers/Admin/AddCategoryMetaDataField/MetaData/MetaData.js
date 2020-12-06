import React, {Component} from 'react'
import classes from './MetaData.module.css'
import Button from '../../../../components/UI/Button/Button'
import Input from '../../../../components/UI/Input/Input'
import {updatedObject} from '../../../../shared/utility'
import {connect} from 'react-redux'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import MetaDataValue from './MetaDataValue/MetaDataValue'
import {Route} from 'react-router-dom'
import UpdateMetaData from '../UpdateMetadata/UpdateMetadata'
import * as actions from '../../../../store/action/index'

class MetaData extends Component {
    state = {
        controls: {
            metaDataField:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter Meta data field'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            }
        },            
        isLoading: false,
        success: false
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

    onSubmitHandler = (event) => {
        event.preventDefault()
        this.setState({success: true})
        this.props.fetchData(this.props.token, this.state.controls.metaDataField.value)
    }

    onContinueHandler = () => {
        this.props.history.push('/add-metadata/metadata-value')
    }

    onUpdateHandler = () => {
        this.props.history.push('/add-metadata/update-metadata-value')
    }
    render(){
        let elementArray = [];
        for( let key in this.state.controls){
            elementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = elementArray.map(element => (
            <Input
                key= {element.id}
                elementType={element.config.elementType}
                elementConfig={element.config.elementConfig}
                value={element.config.value}
                changed={(event) => this.inputChangedHandler(event,element.id)}/>
          
        ))

        let content = null 
        if(this.props.loading){
            content = <Spinner/>
        }
        let error=null
        if(this.props.error){
            error = <div className={classes.Data}>{this.props.error}</div>
        }
        let success=null
        if(!this.props.error && this.state.success && !this.props.loading){
            success = <div className={classes.Data}>Successfully Added</div>
        }

            
        return(
            <div className={classes.Metadata}>
                {content}
                {error}
                {success}
                <p><strong>Please Enter The Required Field .....</strong></p>
                <form>
                    {form}
                </form>
                <div>
                    <Button btnType="Success" clicked={this.onSubmitHandler}>Submit</Button>
                    <Button btnType="Success" clicked={this.onContinueHandler}>Add Meta data Value</Button>
                    <Button btnType="Success" clicked={this.onUpdateHandler}>Update Meta data Value</Button>
                </div>
                <Route 
                        path={this.props.match.path + '/metadata-value'} 
                        component={MetaDataValue}/>
                <Route 
                        path={this.props.match.path + '/update-metadata-value'} 
                        component={UpdateMetaData}/>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        loading: state.metadata.isLoading,
        error: state.metadata.error
    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: (token,metaDataField) => dispatch(actions.metadataField(token,metaDataField))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaData)