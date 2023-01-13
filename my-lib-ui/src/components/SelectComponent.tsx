import React, { useEffect, useState } from 'react'
type selectItems = {
  label: string | number
  value?: string | number
}
type SelectComponentProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string
  data?: selectItems[]
  onSelected?: (value: string | number | undefined) => void
}

const SelectComponent: React.FC<SelectComponentProps> = (props) => {
  const { data = [], label = 'select', onSelected } = props
  const [selected, setSelected] = useState<string | number>('')
  const [showItems, setShowItems] = useState(false)
  const [datas, setDatas] = useState(data)

  useEffect(() => {
    if (data.length && onSelected) {
      setSelected(datas[0].label)
      onSelected(datas[0].value)
    }
  }, [])

  const HandleSelected = (e: any) => {
    const index = parseInt(e.target.value)
    setSelected(datas[index].label)
    setShowItems(false)
    if (onSelected) {
      onSelected(datas[index].value)
    }
  }

  const Filter = (search_value: string) => {
    setDatas(
      data.filter((data) =>
        data.label
          .toString()
          .toLowerCase()
          .includes(search_value.toLowerCase().trim())
      )
    )
  }

  return (
    <div className='component-ui-select'>
      <div
        className='component-ui-select-result'
        onClick={() => setShowItems(!showItems)}
      >
        <div className='component-ui-select-result-text'>
          <span className='component-ui-select-span'>{label}</span>
          <span className='component-ui-select-span-value'>{selected}</span>
        </div>
        <div>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-chevron-down'
            viewBox='0 0 16 16'
          >
            <path
              fillRule='evenodd'
              d='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z'
            />
          </svg>
        </div>
      </div>
      <div className={showItems ? 'component-ui-select-items' : 'hide'}>
        <input
          type='text'
          name='search'
          className='component-ui-select-items-search'
          placeholder='Search ...'
          onChange={(e) => Filter(e.target.value)}
        />
        {datas.map((value, index) => (
          <option
            className='component-ui-select-items-span'
            value={index}
            key={index}
            onClick={(e) => HandleSelected(e)}
          >
            {value.label}
          </option>
        ))}
      </div>
    </div>
  )
}

export default SelectComponent
