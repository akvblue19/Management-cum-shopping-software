import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../../store/action/index'
import classes from './GetProduct.module.css'
import Button from '../../../../components/UI/Button/Button'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import { Redirect } from 'react-router'
import {updatedObject} from '../../../../shared/utility'
import Input from '../../../../components/UI/Input/Input'

class GetProduct extends Component {
    state = {
        redirect: false,
        refresh: false,
        updateRedirect: false,
        toggle: false,
        controls: {
            name:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Please updated name'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            description:{
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Updated description'
                },
                value: '',
                validation:{
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            }
        },
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


    componentDidMount(){
        this.props.allProduct(this.props.token)
    }

    deleteHandler = (id,event) => {
        event.preventDefault()
        this.setState({redirect: true})
        this.props.delete(this.props.token,id)

    }
    updateHandler = (id,event) => {
        event.preventDefault()
        this.setState({updateRedirect: true,refresh: true})
        this.props.update(this.props.token, id, this.state.controls.name.value, this.state.controls.description.value)

    }

    viewHandler = (id,event) => {
        event.preventDefault()
        this.props.view(this.props.token,id)
    }

    toggleHandler = () => {
        this.setState({
        toggle: !this.state.toggle,
    })} 

    render(){
        let detailElementArray = [];
        for( let key in this.state.controls){
            detailElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }
        let auth = null
        if(this.state.toggle){
            auth = detailElementArray.map(detailElement => (
                <Input
                    key= {detailElement.id}
                    elementType={detailElement.config.elementType}
                    elementConfig={detailElement.config.elementConfig}
                    value={detailElement.config.value}
                    changed={(event) => this.inputChangedHandler(event,detailElement.id)}/>
              
            ))
        }
          

        let addcontent = null
        if(this.props.product.length > 0){
        addcontent = (
            <div className = {classes.Seller}>
                <table>
                    <thead>
                        <tr>
                            <td>Id</td>
                            <td>NAME</td>
                            <td>DESCRIPTION</td>
                            <td>BRAND</td>
                            <td>CATEGORY ID</td>
                            <td>CATEGORY NAME</td>
                            <td>VIEW</td>
                            <td>DELETE</td>
                            <td>UPDATE</td>
                        </tr>
                    </thead>
                    <tbody>
                         {this.props.product.map(da => (
                         <tr key = {da.id}>
                            <td>{da.id}</td>
                            <td>{da.name}</td>
                            <td>{da.description}</td>
                            <td>{da.brand}</td>
                            <td>{da.category.id}</td>
                            <td>{da.category.name}</td>
                            <td><Button btnType = "Success" clicked={this.viewHandler.bind(this,da.id)}>View</Button></td>
                            <td><Button btnType = "Danger" clicked = {this.deleteHandler.bind(this,da.id)}>DELETE</Button></td>
                            <td><Button btnType = "Danger" clicked={this.updateHandler.bind(this,da.id)}>Update</Button></td>
                        </tr>   
                        ))}
                    </tbody>
                </table>
            </div>
        )}
        // -------------------------------------------
        let content = null
        if(this.props.detail.length > 0){
            content = (
                <div className = {classes.Seller}>
                    <table>
                        <thead>
                            <tr>
                                <td>Id</td>
                                <td>QUANTITY AVAILABLE</td>
                                <td>PRICE</td>
                                <td>IMAGE</td>
                                <td>FIELD</td>
                                <td>VALUE</td>
                                <td>IS_ACTIVE</td>
                            </tr>
                        </thead>
                        <tbody>
                             {this.props.detail.map(det => (
                             <tr key = {det.id}>
                                <td>{det.id}</td>
                                <td>{det.quantityAvailable}</td>
                                <td>{det.price}</td>
                                <td>{det.productVariationImage}</td>
                                <td>{det.metaData ? Object.keys(det.metaData): null}</td>
                                <td>{det.metaData ? Object.values(det.metaData):null}</td>
                                <td>{String(det.active)}</td>
                               
                            </tr>   
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        }
        let spin=null
        if(this.props.loading){
            spin = <Spinner/>
        }
        
        
        let updateRedirect = null
        if(this.props.success==='Product Updated' && this.state.updateRedirect){
            updateRedirect = <Redirect to="/updated"/>
        }
        let redirect = null
        if(this.state.redirect){
            redirect = <Redirect to="/updated"/>
        }
        let error = null
        if(this.props.err && this.state.refresh){
        error = <div className={classes.Data}><p>{this.props.err}</p></div>
        }
        return(
            <div className={classes.Get}>
                <div className={classes.Pro}><p><strong>MY Prouducts....</strong></p></div>
                {redirect}
                {updateRedirect}
                {addcontent}
                <div className={classes.Switch}>
                    <Button btnType="Danger" clicked={this.toggleHandler}>{!this.state.toggle ? 'Click if you want to update product' : 'Hide'}</Button>
                    {error}
                    {auth}
                </div>
                
                {spin}
                {content}
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        isLoading: state.product.loading,
        product: state.product.sellerProduct,
        detail: state.product.productData,
        del: state.product.deleted,
        error: state.product.error,
        err: state.update.error,
        success: state.update.success
    }
}

const mapDispatchToProps = dispatch => {
    return{
        allProduct: (token) => dispatch(actions.sellerProductFetch(token)),
        delete: (token,id) => dispatch(actions.deleteProduct(token,id)),
        view: (token,id, name, description) => dispatch(actions.viewProduct(token,id, name, description)),
        update: (token, id, name, description) => dispatch(actions.updateProduct(token, id, name, description))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetProduct)