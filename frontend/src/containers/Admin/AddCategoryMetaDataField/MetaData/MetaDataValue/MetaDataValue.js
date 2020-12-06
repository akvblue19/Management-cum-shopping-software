import React ,{Component} from 'react'
import classes from './MetaDataValue.module.css'
import Button from '../../../../../components/UI/Button/Button'
import Input from '../../../../../components/UI/Input/Input'
import {updatedObject} from '../../../../../shared/utility'
import {connect} from 'react-redux'
import * as actions from '../../../../../store/action/index'

class MetaDataValue extends Component {
    state = {
        controls: {
            categoryId:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter Category ID'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            categorymetadataFieldId:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter Category metadata Field Id'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            values:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please enter value'
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
        current: false
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
        this.setState({
            current: true
        })
        this.props.fetchData(this.props.token, this.state.controls.categoryId.value, 
        this.state.controls.categorymetadataFieldId.value, this.state.controls.values.value)
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

            
        return(
            <div className={classes.Metadata}>
                <p><strong>Please Enter The Required Field .....</strong></p>
                <form>
                    {form}
                </form>
                <div>
                    <Button btnType="Success" clicked={this.onSubmitHandler}>Submit</Button>

                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        isLoading: state.metadata.isLoading,
        error: state.metadata.error

    }
}

const mapDispatchToProps = dispatch => {
    return{
        fetchData: (token, id, fieldId, value) => dispatch(actions.metadataValue(token, id, fieldId, value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaDataValue)