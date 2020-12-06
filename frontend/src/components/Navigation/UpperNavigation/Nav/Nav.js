import React from 'react'
import classes from './Nav.module.css'
import {NavLink} from 'react-router-dom'

const nav = (props) => {
    return(
        <li className={classes.NavBars}>
        <NavLink
            to={props.link}
            exact={props.exact}
            activeClassName={classes.active}>
            {props.children}
        </NavLink> </li>
    )
}

export default nav