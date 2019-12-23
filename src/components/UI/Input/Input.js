import React from 'react';
import classes from './Input.module.css'
const Input = (props)=>{

    let inputEl  = null;
    const inputClasses = [classes.InputElemet];
    if(props.invalid &&props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case('input'):
            inputEl =<input className={inputClasses.join(' ')}  onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case('textarea'):
            inputEl =<textarea className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
            break;
        case('select'):
            inputEl =(
                <select 
                    className={inputClasses.join(' ')} 
                    value={props.value} onChange={props.changed}>
                        {props.elementConfig.options.map(option=>
                            (
                                <option key={option.value} value={option.value}>
                                    {option.displayValue}
                                </option>
                            ))}
                    </select>
            );
            break;
        default:
            inputEl = <input className={inputClasses.join(' ')} onChange={props.changed} {...props.elementConfig} value={props.value}/>;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputEl}
        </div>
    )
}

export default Input;