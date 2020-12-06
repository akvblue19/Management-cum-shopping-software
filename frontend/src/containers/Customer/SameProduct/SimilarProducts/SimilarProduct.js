import React,{Component} from 'react'
import Design from '../../ProductVariation/Design/Design'
import classes from './SimilarProduct.module.css'
import Spinner from '../../../../components/UI/Spinner/Spinner'
import {connect} from 'react-redux'

class SimilarProduct extends Component{
    render(){
        let products = this.props.similarProduct.map(product => (
            <div className={classes.View1} key={product.id} onClick={this.props.clicked.bind(this,product.id)}>
                <div className={classes.Pic1}>
                    <img src=  {require(`../../../../assets/images/${product.productVariationImage}`)} alt="product data"/>
                </div>
                <div className={classes.Data}>
                    <p><strong>{product.product.name}</strong></p>
                    <p><strong>Price:</strong> USD: {Number.parseFloat(product.price).toFixed(2)}</p>
                </div>
                
            </div>
              ))

        if(this.props.loading){
            products = <Spinner/>
        }
        return(

            <div>
                <Design/>
                {products}
            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        similarProduct: state.variation.similar,
        loading: state.variation.isLoading
    }
}
export default connect(mapStateToProps)(SimilarProduct)