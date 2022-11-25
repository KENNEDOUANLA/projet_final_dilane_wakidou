import React from "react";
import "../scss/Radio.css"
type RadioComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { name?: string, label?: string};

const RadioComponent: React.FC<RadioComponentProps> = (props) => {
  const {name="radio",label="radio description"}=props
  return (<div className="component-ui-radio">
    <input type="radio" name={name} className="component-ui-radio-input" />
    <span className="component-ui-radio-span">{label}</span>
  </div>);
};

export default RadioComponent;
