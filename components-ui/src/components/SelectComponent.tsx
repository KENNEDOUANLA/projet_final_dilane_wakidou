import React,{ useState} from "react";
type selectItems = {
  label: string | number,
  value ?:string|number
}
type SelectComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {label?: string,data?:selectItems[],onChange?:(value:string|number|undefined)=>void};

const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const {data=[], label = "select" ,onChange} = props
  const [selected, setSelected] = useState<string | number>("")
  const [showItems, setShowItems] = useState(false)
  
  const HandleSelected = (e: any) => {
    const index = parseInt(e.target.value);
    setSelected(data[index].label)
    setShowItems(false)
    if (onChange) {
      onChange(data[index].value)
    }
    
  }

  return (<div className="component-ui-select">
    <div className="component-ui-select-result" onClick={()=>setShowItems(!showItems)}>
      <div className="component-ui-select-result-text">
        <span className="component-ui-select-span">{label}</span>
        <span className="component-ui-select-span-value">{selected}</span>
      </div>
      <div>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-down" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
          </svg>
      </div>
    </div>
    <div className={showItems?"component-ui-select-items":"hide"} >
      {data.map((value,index)=><option className="component-ui-select-items-span" value={index} key={index} onClick={(e)=>HandleSelected(e)}>{value.label}</option>)}
    </div>
    
  </div>);
};

export default SelectComponent;
