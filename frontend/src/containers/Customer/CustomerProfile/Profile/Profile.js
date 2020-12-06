import React,{Component} from 'react'
// import profilepic from '../../../../assets/images/pic3.jpg'
import classes from './Profile.module.css'

class Profile extends Component {
    render(){
        return(
        <div className={classes.Profile}>
            <div className={classes.Dp}>
                <img src={require(`../../../../assets/images/${this.props.profileImg}`)} alt='profile dp'/>
            </div>
            <div className={classes.Data}>
                <p>FirstName:  <strong>{this.props.fName}</strong></p>
                <p>MiddleName: <strong>{this.props.mName}</strong></p>
                <p>LastName:   <strong>{this.props.lName}</strong></p>
                <p>Email:      <strong>{this.props.email}</strong></p>
                <p>Contact No: <strong>{this.props.contactNo}</strong></p>
            </div>
            
        </div>
        )
    }
} 

export default Profile