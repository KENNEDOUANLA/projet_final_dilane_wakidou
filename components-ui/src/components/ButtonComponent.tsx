import React from "react";
type ButtonComponentProps =React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const ButtonComponent: React.FC<ButtonComponentProps> = (props) => {
  const { onClick, style = {}, children } = props;
  const handelClick = (e:any) => {
    if (onClick)
        onClick(e)
  }
  return <button className="component-ui-button" onClick={(e)=>handelClick(e)} style={{backgroundColor:"#C00000",color:"white",...style}}>{children}</button>;
};

export default ButtonComponent;
