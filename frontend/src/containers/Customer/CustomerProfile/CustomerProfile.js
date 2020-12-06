import React, {Component} from 'react'
import * as actions from '../../../store/action/index'
import {connect} from 'react-redux'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Profile from './Profile/Profile'
import classes from './CustomerProfile.module.css'
import CustomerAddress from './CustomerAddress/CustomerAddress'

class CustomerProfile extends Component {
   
    componentDidMount(){
        this.props.profileData(this.props.token);
    }

   
    render(){
        let profile = null
        if(this.props.isLoading){
            profile = <Spinner/>
        } 
        if(!this.props.isLoading){
            profile = this.props.data.map(profile => (
                <Profile 
                key={profile.id}
                profileImg={profile.profile}
                fName={profile.firstName}
                lName={profile.lastName}
                mName={profile.middleName}
                email={profile.email}
                contactNo={profile.contactNo}/>
            ))
        }       
        
        
        let data = null 
        if(this.props.isLoading){
            data = <Spinner/>            
        }

        return(
            <div className={classes.CustomerProfile}>
                {data}
                {profile}
                <CustomerAddress/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        isLoading: state.profile.isLoading,
        data:  state.profile.profileData,
        token: state.auth.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        profileData: (token) => dispatch(actions.fetch(token))   
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerProfile)