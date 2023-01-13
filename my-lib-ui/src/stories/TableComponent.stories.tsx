import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TableComponent } from '../components'
import { RecordType } from '../components/TableComponent'
type donne = {
  nom: string
  prenom: string
  age: number
}
type columnsType = donne & { record?: RecordType }

const data: donne[] = [{ nom: 'dil', prenom: 'xxxxx', age: 5 }]
const columns: columnsType[] = [{ nom: 'dil', prenom: 'xxxxx', age: 5 }]
import '../scss/Table.css'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/InputComponent',
  component: TableComponent
} as ComponentMeta<typeof TableComponent>

export const TableComponentView: ComponentStory<typeof TableComponent> = (
  args
) => <TableComponent {...args} dataSource={data} columns={columns} />
