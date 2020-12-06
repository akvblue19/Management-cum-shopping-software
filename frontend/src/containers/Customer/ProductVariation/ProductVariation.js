import React,{Component} from 'react'
import Products from '../Products/Products'
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'
// import Design from './Design/Design'
import axios from 'axios'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

class ProductVariation extends Component {

    clickHandler =(productId) => {
        this.props.productVariation(productId, this.props.token)
        this.props.history.push('/variation/detail')
    }

    render(){
        return(
            <div>
                {/* <Design/> */}
                <Products clicked={this.clickHandler}/>
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        variationList: state.variation.productVariation,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        productVariation: (productId, token) => dispatch(actions.productVariation(productId,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ProductVariation,axios))