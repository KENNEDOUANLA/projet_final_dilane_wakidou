import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { WarningTwoTone, CheckCircleTwoTone } from '@ant-design/icons'
import { ButtonComponent, TableComponent } from '../components'
import { RecordType } from '../components/TableComponent'
type donne = {
  validee: number
  name: string
  email: string
  numero: string
  nationalite: string
  id: number
}

type columnsType = RecordType
const data: donne[] = [
  {
    id: 1,
    validee: 0,
    name: 'DUMONT-NACHOS Bruce',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92'
  },
  {
    validee: 0,
    name: 'MORABIA Jean-philippe',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 2
  },
  {
    validee: 1,
    name: 'DUMONT-NACHOS Bruce',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 3
  },
  {
    validee: 0,
    name: 'DUMONT-NACHOS Bruce',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 4
  },
  {
    validee: 1,
    name: 'MORABIA Jean-philippe',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 5
  },
  {
    validee: 0,
    name: 'MORABIA Jean-philippe',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 6
  },
  {
    validee: 1,
    name: 'MORABIA Jean-philippe',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 7
  },
  {
    validee: 0,
    name: 'MORABIA Jean-philippe',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 8
  },
  {
    validee: 1,
    name: 'DUMONT-NACHOS Bruce',
    email: 'longue-adresse-exemple@gmail.com',
    nationalite: 'Française',
    numero: '06.34.22.61.92',
    id: 9
  }
]
const columns: columnsType[] = [
  {
    title: 'Status',
    render: ({ validee }) =>
      validee ? (
        <div>
          <CheckCircleTwoTone twoToneColor='#52c41a' className='large' />

          <span className='ml-2 bold' style={{ marginLeft: '13px' }}>
            Validé
          </span>
        </div>
      ) : (
        <div>
          <WarningTwoTone twoToneColor='#ffc107' className='large' />

          <span className='ml-2 bold' style={{ marginLeft: '13px' }}>
            En attente
          </span>
        </div>
      )
  },
  { title: 'Nom / Prénom', dataIndex: 'name' },
  {
    title: 'Coordonnées',
    render: ({ email, numero }) => (
      <div>
        <div>{email}</div>
        <div>{numero}</div>
      </div>
    )
  },
  {
    title: 'Nationalité',
    dataIndex: 'nationalite'
  },
  {
    title: 'Actions',
    render: ({ id, validee }) => {
      return validee ? (
        <ButtonComponent
          style={{
            backgroundColor: '#000000',
            fontSize: '0.75rem',
            height: '30px',
            borderRadius: '3px',
            color: 'white'
          }}
        >
          Editer
        </ButtonComponent>
      ) : (
        <ButtonComponent
          onClick={() => {}}
          style={{
            backgroundColor: '#C00000',
            fontSize: '0.75rem',
            height: '30px',
            borderRadius: '3px',
            color: 'white'
          }}
        >
          Valider
        </ButtonComponent>
      )
    }
  }
]
import '../scss/Table.css'
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/TableComponent',
  component: TableComponent
} as ComponentMeta<typeof TableComponent>

export const TableComponentView: ComponentStory<typeof TableComponent> = (
  args
) => <TableComponent {...args} dataSource={[]} columns={columns} />
