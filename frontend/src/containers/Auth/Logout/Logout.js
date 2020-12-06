import React, {Component} from 'react'
import * as actions from '../../../store/action/index'
import { Redirect } from 'react-router'
import {connect} from 'react-redux'

class Logout extends Component {

    componentDidMount(){
        this.props.onLogout()
        this.props.applyLogout(this.props.token)
    }

    render(){
        return <Redirect to="/login"/>
    }
}


const mapStateToProps = state => {
    return{
        token: state.auth.token
    }
}
const mapDispatchToProps = dispatch  => {
    return {
        onLogout : () => dispatch(actions.logout()),
        applyLogout: (token) => dispatch(actions.applyLogout(token))
    }
}
export default connect(mapStateToProps ,mapDispatchToProps)(Logout)