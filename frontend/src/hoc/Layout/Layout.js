import React, {Component} from 'react'
import Aux from '../AuxHoc/AuxHoc'
import classes from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import {connect} from 'react-redux'

class Layout extends Component {
    state = {
        drawerOpen: false
    }

    sideDrawerHandler = () => {
        this.setState({drawerOpen: false})
    }

    drawerToggleHandler = () => {
        this.setState((prevState) => {
           return {drawerOpen: !prevState.drawerOpen}
        })
    }

    render(){
        return(
            <Aux>
                <Toolbar
                     drawerToggleClicked={this.drawerToggleHandler}
                     isAuthenticated = {this.props.isAuth}/>
                <SideDrawer 
                    open={this.state.drawerOpen}
                    closed={this.sideDrawerHandler}
                    isAuthenticated = {this.props.isAuth}/>
                    <main className={classes.Content}>
                    {this.props.children}
                    </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuth: state.auth.token !== null,
    }
}

export default connect(mapStateToProps)(Layout)

