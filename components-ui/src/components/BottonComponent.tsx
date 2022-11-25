import React from "react";
import "../scss/Botton.css"
type ButtonComponentProps = {
  onClick: () => void;
  value?: string
  style?:any
};

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const { onClick,value="",style={} } = props;
  return <button className="component-ui-button" onClick={onClick} style={{backgroundColor:"#C00000",color:"white",...style}}>{value}</button>;
};

export default ButtonComponent;
