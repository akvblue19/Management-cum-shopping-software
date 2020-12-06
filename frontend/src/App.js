import React,{Component} from 'react';
import * as actions from './store/action/index'
import {connect} from 'react-redux'
import Design from './containers/Customer/ProductVariation/Design/Design'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import CustomerDetail from './containers/SignUps/CustomerDetail/CustomerDetail'
import { Route , Switch }  from 'react-router-dom'
import asyncComponent from './hoc/asyncComponent/asyncComponent'
import SetAddress from './containers/Customer/SetAddress/SetAddress'
import EditProfile from './containers/Customer/EditDetails/EditProfile/EditProfile'
import UpdateMsg from './components/Updated/UpdateMsg'
import EditAddress from './containers/Customer/EditDetails/EditAddress/EditAddress'
import EditPassword from './containers/EditPassword/EditPassword'
import SellerSignUp from './containers/SignUps/SellerSignUp/SellerSignUp'
import ResendLink from './components/ResendLink/ResendLink'
import ProductVariation from './containers/Seller/ProductVariation/ProductVariation'
import AllSellers from './containers/Admin/AllSellers/AllSeller';
import AllCustomers from './containers/Admin/AllCustomers/AllCustomer'
import MetaData from './containers/Admin/AddCategoryMetaDataField/MetaData/MetaData';
import GetMetaData from './containers/Admin/GetMetadata/GetMetadata'
import AddCategory from './containers/Admin/AddCategory/AddCategory'
import CategoryById from './containers/Admin/CategoryById/CategoryById'
import GetProduct from './containers/Admin/Product/GetProduct/GetProduct';
import GetProfile from './containers/Seller/GetProfile/GetProfile';
import UpdateProfile from './containers/Seller/UpdateProfile/UpdateProfile';
import UpdateAddress from './containers/Seller/UpdateProfile/UpdateAddress/UpdateAddress';
import AddProduct from './containers/Seller/Product/AddProduct/AddProduct';
import SellerProduct from './containers/Seller/Product/GetProducts/GetProduct'
import GetCategory from './containers/Seller/GetCategory/GetCategory';
import Home from './containers/Customer/ProductVariation/ProductVariation';
import VariationDetail from './containers/Customer/VariationDetail/VariationDetail';
import SameProduct from './containers/Customer/SameProduct/SameProduct';
import CategoryList from './containers/Customer/CategoryList/CategoryList';
import ProductView from './containers/Customer/CategoryProductView/ProductView';
import ForgotPassword from './containers/ForgotPassword/ForgotPassword';
import Reset from './containers/ForgotPassword/Reset/Reset';
import ConfirmAccount from './containers/ConfirmAccount/ConfirmAccount';

const asyncProfile = asyncComponent(() => {
  return import('./containers/Customer/CustomerProfile/CustomerProfile')
})


class App extends Component{

  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render(){
    let route = null
    if(this.props.auth && this.props.user === 'admin'){
      route = (
        <Switch>
          <Route path="/add-category" component={AddCategory}/>
          <Route path="/get-category" component={CategoryById}/>
          <Route path="/get-metadata" component={GetMetaData}/>
          <Route path="/add-metadata" component={MetaData}/>
          <Route path="/admin/sellers" component={AllSellers}/>
          <Route path="/admin/customers" component={AllCustomers}/>
          <Route path="/all-product" component={GetProduct}/>
        </Switch>
      )
    }

    if(this.props.auth && this.props.user === 'seller'){
      route = (
        <Switch>
          <Route path="/edit-profile/password" component={EditPassword}/>
          <Route path="/get-category" component={GetCategory}/>
          <Route path="/add/product-variation" component={ProductVariation}/>
          <Route path="/seller/products" component={SellerProduct}/>
          <Route path="/post/product" component={AddProduct}/>
          <Route path="/update-seller-address" component={UpdateAddress}/>
          <Route path="/updaet-seller-profile" component={UpdateProfile}/>
          <Route path="/seller-profile" component={GetProfile}/>
         
          
          
        </Switch>
      )
    }

    if(this.props.auth && this.props.user === 'customer'){
      route = (
        <Switch>
          {/* <Route path='/variation/detail' component={VariationDetail}/> */}
          <Route path="/edit-password" component={EditPassword}/>
          <Route path="/edit-profile" exact component={EditProfile}/>
          <Route path="/edit-address" component={EditAddress}/>
          <Route path="/add-address" component={SetAddress}/>
          <Route path="/my-profile" component={asyncProfile}/>
          <Route path='/similar/product' component={SameProduct}/>
          <Route path='/customer/category' component={CategoryList}/>
          <Route path='/category/product' component={ProductView}/>
        </Switch>
      )
    }
    return(
      <Layout>
          {route}
          <Route path="/confirm-account" component={ConfirmAccount}/>
          <Route path="/updated" exact component={UpdateMsg}/>
          <Route path="/reset/password" component={Reset}/>
          <Route path="/Design" component={Design}/>
          <Route path='/variation/detail' component={VariationDetail}/>
          <Route path="/signup/customer" component={CustomerDetail}/>
          <Route path="/resend-link" component={ResendLink}/>
          <Route path="/signup/employee" component={SellerSignUp}/>
          <Route path="/login" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/forgot/password" component={ForgotPassword}/>
          <Route path="/" exact component={Home}/>
      </Layout>
      
    )
  }
}

const mapStateToProps = state => {
  return{
    auth: state.auth.token !== null,
    user: state.auth.label
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(App);
