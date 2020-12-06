import React,{Component} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import Spinner from '../../../components/UI/Spinner/Spinner'
import classes from './Products.module.css'


class Products extends Component {

    componentDidMount(){
        this.props.products()
    }

    render(){
            let products = this.props.fetchedProducts.map(product => (
                <div className={classes.View} key={product.id} onClick={this.props.clicked.bind(this,product.id)}>
                    <div className={classes.Pic}>
                        <img src=  {require(`../../../assets/images/${product.productVariationImage}`)} alt="product data"/>
                    </div>
                    <div className={classes.Data}>
                        <p><strong>{product.product.name}</strong></p>
                        <p><strong>Price:</strong> USD: {Number.parseFloat(product.price).toFixed(2)}</p>
                    </div>
                </div>
                  ))
    
            if(this.props.isLoading){
                products = <Spinner/>
            }
            return(
                <div className={classes.Main}>
                    <div className={classes.Products}>
                        {products}
                    </div>
                </div>
                
            );
    
    }
}
const mapStateToProps = state => {
    return{
        fetchedProducts: state.product.products,
        isLoading: state.product.isLoading   
    }
}

const mapDispatchToProps = dispatch => {
    return {
        products: () => dispatch(actions.product())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Products)