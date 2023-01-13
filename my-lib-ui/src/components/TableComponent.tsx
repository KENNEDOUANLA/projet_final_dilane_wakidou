import React, { useEffect, useState } from 'react'

type record = any
export type RecordType = {
  title: React.ReactElement | string
  dataIndex?: string
  key?: string
  render?: (data: record) => React.ReactElement
  record?: record
}
export type pagination = {
  pageSize: number
}
export type TableComponentProps = {
  columns: RecordType[]
  dataSource: record[]
  pagination: pagination | false
  rowkey?: string | number
  empty?: React.ReactElement
}

type paginationProps = {
  onClick: () => void
  value: React.ReactElement | number
  active?: boolean
  clickabel?: boolean
}

const Pagin: React.FC<paginationProps> = (props) => {
  const { value, onClick, active = false, clickabel = true } = props
  const getClass = (active: boolean, clickabel: boolean) => {
    let activeText = active ? 'component-ui-pagination-active ' : ''
    activeText += clickabel ? '' : 'component-ui-pagination-not-clickabel '
    activeText += 'component-ui-pagination'
    return activeText
  }
  return (
    <div
      onClick={clickabel ? onClick : () => {}}
      className={getClass(active, clickabel)}
    >
      {value}
    </div>
  )
}
const Empty = () => (
  <div className='component-ui-table-nor-data-default'>
    <div>
      <img src='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg' />
    </div>
    <div>
      <span>Aucune donnée disponible</span>
    </div>
  </div>
)

const TableComponent: React.FC<TableComponentProps> = (props) => {
  const {
    dataSource,
    columns,
    pagination = { pageSize: 5 },
    rowkey = false,
    empty = <Empty />
  } = props
  const [show, setShow] = useState<record[]>([])
  const [page, setPage] = useState<number>(1)
  const [paginSize, setPageSize] = useState<number[]>([])

  useEffect(() => {
    if (pagination) {
      let i = 0
      const pages = []
      while (i < dataSource.length / pagination.pageSize) {
        pages.push(i + 1)
        i++
      }
      setPageSize(pages)
    }
  }, [dataSource])

  useEffect(() => {
    if (pagination) {
      const intervalMax = page * pagination.pageSize
      const intervalMin = (page - 1) * pagination.pageSize
      setShow(
        dataSource.filter(
          (_: record, index: number) =>
            intervalMin <= index && index < intervalMax
        )
      )
    } else {
      setShow(dataSource)
    }
  }, [page, dataSource])

  return (
    <div className='component-ui-table'>
      <table>
        <thead>
          <tr className='component-ui-table-tr'>
            {columns.map((column: RecordType, index: number) => (
              <th key={`th-${index}`}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {show.map((data: record, index: number) => (
            <tr key={rowkey ? data[rowkey] : `key-${index}`}>
              {columns.map((column: RecordType, index: number) => (
                <td key={`column-${index}`}>
                  {column.render
                    ? column.render(data)
                    : column.dataIndex
                    ? data[column.dataIndex]
                    : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {dataSource.length === 0 && (
        <div className='component-ui-table-nor-data'>{empty}</div>
      )}
      {pagination && dataSource.length > 0 && (
        <div className='component-ui-table-pagin'>
          <Pagin
            value={
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-left'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'
                  />
                </svg>
              </span>
            }
            clickabel={page - 1 > 0}
            onClick={() => setPage(page - 1)}
          />
          {paginSize.map((p: number) => (
            <Pagin
              value={p}
              onClick={() => setPage(p)}
              active={p === page}
              key={`pagin-${p}`}
            />
          ))}
          <Pagin
            value={
              <span>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  className='bi bi-chevron-right'
                  viewBox='0 0 16 16'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'
                  />
                </svg>
              </span>
            }
            clickabel={paginSize[paginSize.length - 1] > page}
            onClick={() => setPage(page + 1)}
          />
        </div>
      )}
    </div>
  )
}

export default TableComponent
