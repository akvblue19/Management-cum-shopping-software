import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
// import NavigationItems from '../NavigationItems/NavigationItems'
import Nav from '../UpperNavigation/UpperNav'
import DrawerToggel from '../SideDrawer/DrawerToggle/DrawerToggle'
import Search from '../../Search/Search'

const toolbar = (props) => (
    
    <header className={classes.Toolbar}>
        <DrawerToggel clicked={props.drawerToggleClicked}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <div className={classes.Search}>
            <Search/>
        </div>
        <nav className={classes.DesktopOnly}>
            <Nav isAuth = {props.isAuthenticated}/>            
        </nav>
    </header>
)


export default toolbar;