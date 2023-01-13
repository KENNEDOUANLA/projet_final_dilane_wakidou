import { useEffect } from '@storybook/addons'
import React from 'react'

type record = any
export type RecordType = {
  title: string | HTMLElement
  dataIndex?: string
  key?: string
  render?: () => HTMLElement | string
  record?: record
}
export type TableComponentProps = {
  columns: RecordType[]
  dataSource: record[]
}
const TableComponent: React.FC<TableComponentProps> = (props) => {
  const { dataSource, columns } = props
  useEffect(() => {
    console.log('[dataSource, columns]', dataSource, columns)
  }, [])
  return (
    <div>
      <table>
        <thead></thead>
        <tbody></tbody>
      </table>
    </div>
  )
}

export default TableComponent
