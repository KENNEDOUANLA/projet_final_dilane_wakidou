import React,{useState} from "react";
import "../scss/Input.css"
type InputComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {label?: string};
const InputComponent:React.FC <InputComponentProps>= (props) => {
  const {
    type = "text",
    value,
    label="Name",
    name,
    onChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log("onchange function absend", e.target.value) }
  } = props;
  
  const [active,setActive]=useState<boolean>(false)

  return (
    <div className={active?"component-ui-input component-ui-input-active":"component-ui-input"}  onClick={()=>setActive(true)} onMouseLeave={()=>setActive(false)}>
      <span className="component-ui-input-span">{label}</span>
      <input className="component-ui-input-input" name={name} type={type} value={value} onChange={(e)=>onChange(e)}/>
    </div>
  );
}

export default InputComponent;