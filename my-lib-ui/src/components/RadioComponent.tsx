import React from "react";

type RadioComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {label?: string};

const RadioComponent: React.FC<RadioComponentProps> = (props) => {
  const { name = "radio", label = "radio description",value,onChange ,checked} = props
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if (onChange) {
      onChange(e)
    }
  }
  return (<div className="component-ui-radio">
    <input type="radio" name={name} className="component-ui-radio-input" value={value} onChange={onHandleChange} checked={checked}/>
    <span className="component-ui-radio-span">{label}</span>
  </div>);
};

export default RadioComponent;
