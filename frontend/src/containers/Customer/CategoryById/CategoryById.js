import React,{Component} from 'react'
import {connect} from 'react-redux'
import classes from './CategoryById.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class CategoryById extends Component{
    render(){
            let products = null
            if(this.props.isLoading){
                products = <div className={classes.Spin}><Spinner/></div>
            }
            if(!this.props.isLoading){
                products = this.props.data.map(product => (
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
        data: state.category.idData,
        isLoading: state.category.isLoading
    }
}

export default connect(mapStateToProps)(CategoryById)