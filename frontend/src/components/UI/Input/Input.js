import React from 'react'
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement]

    switch(props.elementType){
        case('input'):
            inputElement=<input 
            className={inputClasses.join(' ')} 
            value={props.value}
            {...props.elementConfig} 
            onChange={props.changed}
        />
        break;
        case('textarea'):
            inputElement=<textarea 
            className={inputClasses.join(' ')} 
            value={props.value}
            {...props.elementConfig} 
            onChange={props.changed}
        />
        break;
        case('select'):
            inputElement=<select 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>
                {props.elementConfig.options.map(option => (
                                <option 
                                        key={option.value}
                                        value={option.value}>
                                        {option.displayValue}
                                </option>
                            ))}
            </select>
        break;
        default:
            inputElement = <input
            className={inputClasses.join(' ')}
            value={props.value}
            {...props.elementConfig} 
            onChange={props.changed}/>
    }
    return(
        <div>
            <label>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input