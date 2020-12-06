import React,{Component} from 'react'
import classes from './UpdateMsg.module.css'

class UpdateMsg extends Component {
    render(){
        return(
            <div className={classes.Msg}>
                <p><strong>Updated Successfully</strong></p>
            </div>
        )
    }
}


export default UpdateMsg