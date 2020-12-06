import React,{Component}  from 'react'
import {connect} from 'react-redux'
import * as actions from '../../../store/action/index'
import classes from './GetProfile.module.css'
import Spinner from '../../../components/UI/Spinner/Spinner'

class GetProfile extends Component{
    componentDidMount(){
        this.props.profile(this.props.token)
    }
    render(){
        let profile = null
        if(this.props.loading){
            profile = <Spinner/>
        }
        if(!this.props.loading){
            profile = this.props.data.map(profiled => (
                <div className={classes.Seller} key={profiled.id}>
                    <div className={classes.Dp}>
                        <img src={require(`../../../assets/images/${profiled.profile}`)} alt='profile dp'/>
                    </div>
                    <div className={classes.Data}>
                        <p>FirstName:      <strong>{profiled.firstName}</strong></p>
                        <p>MiddleName:     <strong>{profiled.middleName}</strong></p>
                        <p>LastName:       <strong>{profiled.lastName}</strong></p>
                        <p>Email:          <strong>{profiled.email}</strong></p>
                        <p>Gst:            <strong>{profiled.gst}</strong></p>
                        <p>companyName:    <strong>{profiled.companyName}</strong></p>
                        <p>companyContact: <strong>{profiled.companyContact}</strong></p>
                        <p>Addresses ID:   <strong>{profiled.addresses[0] ? profiled.addresses[0].id : null}</strong></p>
                        <p>City:           <strong>{profiled.addresses[0] ? profiled.addresses[0].city : null}</strong></p>
                        <p>State:          <strong>{profiled.addresses[0] ? profiled.addresses[0].state : null}</strong></p>
                        <p>Country:        <strong>{profiled.addresses[0] ? profiled.addresses[0].country : null}</strong></p>
                        <p>Address:        <strong>{profiled.addresses[0] ? profiled.addresses[0].address : null}</strong></p>
                        <p>Zipcode:        <strong>{profiled.addresses[0] ? profiled.addresses[0].zipCode : null}</strong></p>
                        <p>Label:          <strong>{profiled.addresses[0] ? profiled.addresses[0].label : null}</strong></p>
    
                    </div>
                    
                </div>
            ))
        }
       
              if(this.props.loading){
                  profile = <div className={classes.Seller}><Spinner/></div>
              }
        return(
        <div>{profile}</div>
        )
    }
}

const mapStateToProps = state => {
    return{
        token: state.auth.token,
        data: state.profile.sellerData,
        loading: state.profile.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        profile: (token) => dispatch(actions.sellerFetch(token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(GetProfile)