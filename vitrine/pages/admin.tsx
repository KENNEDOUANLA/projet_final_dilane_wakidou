import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import stylesAdmin from '../styles/admin.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {ButtonComponent} from "my-lib-ui"
import {ColumnsType} from 'antd/lib/table'
import {Table} from 'antd'
import { valideUserRequest } from './api/user'
export default function Home() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<dataType[]> ([
    {
      id: 1,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    },
    {
      id: 2,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    },
    {
      id: 3,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    }
  ])
  const [dataSourceNewUsers, setDataSourceNewUsers] = useState<dataType[]> ([
    {
      id: 1,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    },
    {
      id: 2,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    },
    {
      id: 3,
      type: 'entreprise',
      nom: 'Test',
      prenom: 'testt',
      email: 'test@gmail.com',
      numero: '0404040404',
      nationalite: 'french'
    }
  ])

  type dataType = {
    id: number;
    type: string;
    nom: string;
    prenom: string;
    email: string;
    numero: string;
    nationalite: string;
  }

  const [columns] = useState<ColumnsType<dataType>> ([
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom'
    },
    {
      title: 'Prenom',
      dataIndex: 'prenom',
      key: 'prenom'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Numéro',
      dataIndex: 'numero',
      key: 'numero'
    },
    {
      title: 'Nationalité',
      dataIndex: 'nationalite',
      key: 'nationalite'
    },
  ])

  const [columnsNewUsers] = useState<ColumnsType<dataType>> ([
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Nom',
      dataIndex: 'nom',
      key: 'nom'
    },
    {
      title: 'Prenom',
      dataIndex: 'prenom',
      key: 'prenom'
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email'
    },
    {
      title: 'Numéro',
      dataIndex: 'numero',
      key: 'numero'
    },
    {
      title: 'Nationalité',
      dataIndex: 'nationalite',
      key: 'nationalite'
    },
    {
      title: 'Valider',
      key: 'validate',
      render: (_,{id}) => {
        return (
          <ButtonComponent onClick={() => HandleSubmit(id)} style={{backgroundColor: '#e4f6ed', fontSize: '0.75rem', height: '30px', borderRadius: '3px', color: 'black'}}>Valider</ButtonComponent>
        )
      }
    }
  ])
  const HandleSubmit = (id:number) => {
    valideUserRequest(id)
      .then( (res:number) => {
        console.log(res)
        const validateUser = dataSourceNewUsers.find(data => data.id === res)
        if(validateUser) {
          setDataSource([validateUser, ...dataSource])
        }
        dataSourceNewUsers.filter(data => data.id !== res)
      })

  }
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Final project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="navbar">
        <div className={styles.logo}>
          <Image src="/logo_eval.png" alt="Vercel Logo" className={styles.logo_image} width={100} height={200}/>
        </div>
        <div></div>
        {/* COMPONENT */}
        <ButtonComponent onClick={()=>router.push('/connexion')}>Connexion admin</ButtonComponent>
      </nav>
      <div className={stylesAdmin.container}>
        <h1>Admin page</h1>
        <div className={stylesAdmin.tablesDiv}>
          <div>
            <h2>Future users</h2>
            <Table className={stylesAdmin.table} dataSource={dataSource} columns={columnsNewUsers}/>
          </div>
          <div>
            <h2>Users</h2>
            <Table className={stylesAdmin.table} dataSource={dataSource} columns={columns}/>
          </div>
        </div>
      </div>

      <footer className="footer">
        <ul>
          <li>Contact</li>
          <li>Conditions généralespdf</li>
        </ul>
        <p>RIDE 2022 - tout droits reservés</p>
      </footer>

    </div>
  )
}
