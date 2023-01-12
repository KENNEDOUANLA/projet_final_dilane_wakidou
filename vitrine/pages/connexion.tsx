import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import styles from '../styles/connexion.module.css'
import {ButtonComponent,RadioComponent,InputComponent,SelectComponent,CheckboxComponent} from "my-lib-ui"
import { useState } from 'react'
import { type } from 'os'
import { loginRequest, checkRole } from './api/user'

type User = {
  login: string,
  password:string
}
export default function Connexion() {
  const [user, setUser] = useState<User>({ login:"", password:"" });
  const router = useRouter();
  const HandleClick = (e: any) => {
    e.preventDefault()
    if(!user.login || !user.password) {
      alert('Veuillez remplir tout les champs du formulaire') 
    }
    else {
      loginRequest(user)
        .then( (res:any) => {
          if(res) {
            // localStorage.setItem(res)
            checkRole(res)
          }
        })
    }
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
        <ButtonComponent>Connexion admin</ButtonComponent>
      </nav>

      <div className={styles.formDiv} >
        <div className={styles.back} onClick={()=>router.push('/')}>
          <span style={{color:"rgb(192, 0, 0)"}}>&larr;</span><span> Retour</span>
        </div>
        
        <form className={styles.formcontent}>
          <span className={styles.formcontentTitle}>CONNEXION</span>
          <InputComponent label='Identifiant' value={user.login}  onChange={(e) => setUser({ ...user, login: e.target.value })}/>
          <InputComponent label='Mot de passe' type="password" value={user.password} onChange={(e)=>setUser({ ...user, password: e.target.value })}/>
          <ButtonComponent onClick={HandleClick}>Connexion</ButtonComponent>
        </form>
      </div>

      <footer className='footer'>
        <ul>
          <li>Contact</li>
          <li>Conditions généralespdf</li>
        </ul>
        <p className={styles.footerP}>RIDE 2022 - tout droits reservés</p>
      </footer>

    </div>
  )
}
