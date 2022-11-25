import React from "react";

type CheckboxComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string ,onChange?:(checked:boolean)=>void }
const CheckboxComponent: React.FC<CheckboxComponentProps> = (props) => {
  const {name = "", label = "j’atteste que je possède un permis de conduire valide.", onChange } = props;
  
  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
    if (onChange) {
      onChange(e.target.checked)
    }
  }
  
  return (
    <div className="component-ui-checkbox">
      <input type="checkbox" name={name} className="component-ui-checkbox-input" onChange={(e)=>onHandleChange(e)}/>
      <span className="component-ui-checkbox-span">{label}</span>
    </div>
  );

}

export default CheckboxComponent;
