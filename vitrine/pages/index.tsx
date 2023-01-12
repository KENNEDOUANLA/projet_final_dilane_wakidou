import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {ButtonComponent,RadioComponent,InputComponent,SelectComponent,CheckboxComponent} from "my-lib-ui"
import { inscriptionRequest } from './api/user'
import { notification } from 'antd'

const pays=[
  {label: "Afghanistan",value:1},
  {label: "Afrique du Sud",value:1},
  {label: "Albanie",value:1},
  {label: "Algérie",value:1},
  {label: "Allemagne",value:1},
  {label: "Andorre",value:1},
  {label: "Angola",value:1},
  {label: "Anguilla",value:1},
  {label: "Antarctique",value:1},
  {label: "Antigua-et-Barbuda",value:1},
  {label: "Antilles néerlandaises",value:1},
  {label: "Arabie saoudite",value:1},
  {label: "Argentine",value:1},
  {label: "Arménie",value:1},
  {label: "Aruba",value:1},
  {label: "Australie",value:1},
  {label: "Autriche",value:1},
  {label: "Azerbaïdjan",value:1},
  {label: "Bahamas",value:1},
  {label: "Bahreïn",value:1},
  {label: "Bangladesh",value:1},
  {label: "Barbade",value:1},
  {label: "Bélarus",value:1},
  {label: "Belgique",value:1},
  {label: "Belize",value:1},
  {label: "Bénin",value:1},
  {label: "Bermudes",value:1},
  {label: "Bhoutan",value:1},
  {label: "Bolivie",value:1},
  {label: "Bosnie-Herzégovine",value:1},
  {label: "Botswana",value:1},
  {label: "Brésil",value:1},
  {label: "Brunéi Darussalam",value:1},
  {label: "Bulgarie",value:1},
  {label: "Burkina Faso",value:1},
  {label: "Burundi",value:1},
  {label: "Cambodge",value:1},
  {label: "Cameroun",value:1},
  {label: "Canada",value:1},
  {label: "Cap-Vert",value:1},
  {label: "Ceuta et Melilla",value:1},
  {label: "Chili",value:1},
  {label: "Chine",value:1},
  {label: "Chypre",value:1},
  {label: "Colombie",value:1},
  {label: "Comores",value:1},
  {label: "Congo-Brazzaville",value:1},
  {label: "Corée du Nord",value:1},
  {label: "Corée du Sud",value:1},
  {label: "Costa Rica",value:1},
  {label: "Côte d’Ivoire",value:1},
  {label: "Croatie",value:1},
  {label: "Cuba",value:1},
  {label: "Danemark",value:1},
  {label: "Diego Garcia",value:1},
  {label: "Djibouti",value:1},
  {label: "Dominique",value:1},
  {label: "Égypte",value:1},
  {label: "El Salvador",value:1},
  {label: "Émirats arabes unis",value:1},
  {label: "Équateur",value:1},
  {label: "Érythrée",value:1},
  {label: "Espagne",value:1},
  {label: "Estonie",value:1},
  {label: "État de la Cité du Vatican",value:1},
  {label: "États fédérés de Micronésie",value:1},
  {label: "États-Unis",value:1},
  {label: "Éthiopie",value:1},
  {label: "Fidji",value:1},
  {label: "Finlande",value:1},
  {label: "France",value:1},
  {label: "Gabon",value:1},
  {label: "Gambie",value:1},
  {label: "Géorgie",value:1},
  {label: "Géorgie du Sud et les îles Sandwich du Sud",value:1},
  {label: "Ghana",value:1},
  {label: "Gibraltar",value:1},
  {label: "Grèce",value:1},
  {label: "Grenade",value:1},
  {label: "Groenland",value:1},
  {label: "Guadeloupe",value:1},
  {label: "Guam",value:1},
  {label: "Guatemala",value:1},
  {label: "Guernesey",value:1},
  {label: "Guinée",value:1},
  {label: "Guinée équatoriale",value:1},
  {label: "Guinée-Bissau",value:1},
  {label: "Guyana",value:1},
  {label: "Guyane française",value:1},
  {label: "Haïti",value:1},
  {label: "Honduras",value:1},
  {label: "Hongrie",value:1},
  {label: "Île Bouvet",value:1},
  {label: "Île Christmas",value:1},
  {label: "Île Clipperton",value:1},
  {label: "Île de l'Ascension",value:1},
  {label: "Île de Man",value:1},
  {label: "Île Norfolk",value:1},
  {label: "Îles Åland",value:1},
  {label: "Îles Caïmans",value:1},
  {label: "Îles Canaries",value:1},
  {label: "Îles Cocos - Keeling",value:1},
  {label: "Îles Cook",value:1},
  {label: "Îles Féroé",value:1},
  {label: "Îles Heard et MacDonald",value:1},
  {label: "Îles Malouines",value:1},
  {label: "Îles Mariannes du Nord",value:1},
  {label: "Îles Marshall",value:1},
  {label: "Îles Mineures Éloignées des États-Unis",value:1},
  {label: "Îles Salomon",value:1},
  {label: "Îles Turks et Caïques",value:1},
  {label: "Îles Vierges britanniques",value:1},
  {label: "Îles Vierges des États-Unis",value:1},
  {label: "Inde",value:1},
  {label: "Indonésie",value:1},
  {label: "Irak",value:1},
  {label: "Iran",value:1},
  {label: "Irlande",value:1},
  {label: "Islande",value:1},
  {label: "Israël",value:1},
  {label: "Italie",value:1},
  {label: "Jamaïque",value:1},
  {label: "Japon",value:1},
  {label: "Jersey",value:1},
  {label: "Jordanie",value:1},
  {label: "Kazakhstan",value:1},
  {label: "Kenya",value:1},
  {label: "Kirghizistan",value:1},
  {label: "Kiribati",value:1},
  {label: "Koweït",value:1},
  {label: "Laos",value:1},
  {label: "Lesotho",value:1},
  {label: "Lettonie",value:1},
  {label: "Liban",value:1},
  {label: "Libéria",value:1},
  {label: "Libye",value:1},
  {label: "Liechtenstein",value:1},
  {label: "Lituanie",value:1},
  {label: "Luxembourg",value:1},
  {label: "Macédoine",value:1},
  {label: "Madagascar",value:1},
  {label: "Malaisie",value:1},
  {label: "Malawi",value:1},
  {label: "Maldives",value:1},
  {label: "Mali",value:1},
  {label: "Malte",value:1},
  {label: "Maroc",value:1},
  {label: "Martinique",value:1},
  {label: "Maurice",value:1},
  {label: "Mauritanie",value:1},
  {label: "Mayotte",value:1},
  {label: "Mexique",value:1},
  {label: "Moldavie",value:1},
  {label: "Monaco",value:1},
  {label: "Mongolie",value:1},
  {label: "Monténégro",value:1},
  {label: "Montserrat",value:1},
  {label: "Mozambique",value:1},
  {label: "Myanmar",value:1},
  {label: "Namibie",value:1},
  {label: "Nauru",value:1},
  {label: "Népal",value:1},
  {label: "Nicaragua",value:1},
  {label: "Niger",value:1},
  {label: "Nigéria",value:1},
  {label: "Niue",value:1},
  {label: "Norvège",value:1},
  {label: "Nouvelle-Calédonie",value:1},
  {label: "Nouvelle-Zélande",value:1},
  {label: "Oman",value:1},
  {label: "Ouganda",value:1},
  {label: "Ouzbékistan",value:1},
  {label: "Pakistan",value:1},
  {label: "Palaos",value:1},
  {label: "Panama",value:1},
  {label: "Papouasie-Nouvelle-Guinée",value:1},
  {label: "Paraguay",value:1},
  {label: "Pays-Bas",value:1},
  {label: "Pérou",value:1},
  {label: "Philippines",value:1},
  {label: "Pitcairn",value:1},
  {label: "Pologne",value:1},
  {label: "Polynésie française",value:1},
  {label: "Porto Rico",value:1},
  {label: "Portugal",value:1},
  {label: "Qatar",value:1},
  {label: "R.A.S. chinoise de Hong Kong",value:1},
  {label: "R.A.S. chinoise de Macao",value:1},
  {label: "régions éloignées de l’Océanie",value:1},
  {label: "République centrafricaine",value:1},
  {label: "République démocratique du Congo",value:1},
  {label: "République dominicaine",value:1},
  {label: "République tchèque",value:1},
  {label: "Réunion",value:1},
  {label: "Roumanie",value:1},
  {label: "Royaume-Uni",value:1},
  {label: "Russie",value:1},
  {label: "Rwanda",value:1},
  {label: "Sahara occidental",value:1},
  {label: "Saint-Barthélémy",value:1},
  {label: "Saint-Kitts-et-Nevis",value:1},
  {label: "Saint-Marin",value:1},
  {label: "Saint-Martin",value:1},
  {label: "Saint-Pierre-et-Miquelon",value:1},
  {label: "Saint-Vincent-et-les Grenadines",value:1},
  {label: "Sainte-Hélène",value:1},
  {label: "Sainte-Lucie",value:1},
  {label: "Samoa",value:1},
  {label: "Samoa américaines",value:1},
  {label: "Sao Tomé-et-Principe",value:1},
  {label: "Sénégal",value:1},
  {label: "Serbie",value:1},
  {label: "Serbie-et-Monténégro",value:1},
  {label: "Seychelles",value:1},
  {label: "Sierra Leone",value:1},
  {label: "Singapour",value:1},
  {label: "Slovaquie",value:1},
  {label: "Slovénie",value:1},
  {label: "Somalie",value:1},
  {label: "Soudan",value:1},
  {label: "Sri Lanka",value:1},
  {label: "Suède",value:1},
  {label: "Suisse",value:1},
  {label: "Suriname",value:1},
  {label: "Svalbard et Île Jan Mayen",value:1},
  {label: "Swaziland",value:1},
  {label: "Syrie",value:1},
  {label: "Tadjikistan",value:1},
  {label: "Taïwan",value:1},
  {label: "Tanzanie",value:1},
  {label: "Tchad",value:1},
  {label: "Terres australes françaises",value:1},
  {label: "Territoire britannique de l'océan Indien",value:1},
  {label: "Territoire palestinien",value:1},
  {label: "Thaïlande",value:1},
  {label: "Timor oriental",value:1},
  {label: "Togo",value:1},
  {label: "Tokelau",value:1},
  {label: "Tonga",value:1},
  {label: "Trinité-et-Tobago",value:1},
  {label: "Tristan da Cunha",value:1},
  {label: "Tunisie",value:1},
  {label: "Turkménistan",value:1},
  {label: "Turquie",value:1},
  {label: "Tuvalu",value:1},
  {label: "Ukraine",value:1},
  {label: "Union européenne",value:1},
  {label: "Uruguay",value:1},
  {label: "Vanuatu",value:1},
  {label: "Venezuela",value:1},
  {label: "Viêt Nam",value:1},
  {label: "Wallis-et-Futuna",value:1},
  {label: "Yémen",value:1},
  {label: "Zambie",value:1},
    { label: "Zimbabwe", value: 1 }
]
const data = pays.map((val, index) => { return { ...val, value: index + 1 } });
type NewUser = {
  type: string|boolean,
  name: string,
  subName: string,
  eMail: string,
  phone: string,
  nation: string | number | undefined,
  acceptCondi:boolean
}

export default function Home() {
  const [isloading, setIsLoading] = useState(false)
  const [checkbox, stateCheckbox] = useState(false);
  const [user,setUser]=useState<NewUser>({type:false,name:"",subName:"",eMail:"",phone:"",nation:1,acceptCondi:false})
  const router = useRouter();
  const [api, contextHolder] = notification.useNotification();

  const HandleSubmit = (e:any) => {
    e.preventDefault()
    if(!user.acceptCondi || !user.eMail || !user.name || !user.nation || !user.phone || !user.subName || !user.type) {
      alert('Veuillez remplir tout les champs du formulaire')
    }
    else {
      setIsLoading(true)
      inscriptionRequest(user)
        .then( (res) => {
          console.log(res);
          setIsLoading(false)
          api.info({
            message: `Notification`,
            description: 'Votre compte sera être examiné par un admin avant validation',
            placement: 'bottomRight',
            duration: 10,
            onClose() {
              router.push('/connexion')
            },
          })
        })
        .catch( (err) => {
          console.log(err);
          
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
        {/* COMPONENT */}
        <ButtonComponent onClick={()=>router.push('/connexion')}>Connexion admin</ButtonComponent>
      </nav>
      <div className={styles.headerImg}>
        <p>▷ Depuis 2008, RIDE, agence de location de voitures de luxe propose ses services partout en France (Paris, Monaco, Nice, Cannes, Saint-Tropez, Courchevel, Saint-Moritz...).Notre expérience est à votre service pour répondre à toutes vos demandes</p>
      </div>
      <div className={styles.formDivContainer}>
        <form className={styles.formDiv}>
          {contextHolder}
          <span className={styles.formDivSpan}>INSCRIPTION</span>
          <p>Je suis :</p>
          <div className={styles.radios}>
            <RadioComponent label='une entreprise' name='type' value='entreprise' onChange={(e) => setUser({ ...user, type:e.target.value })}/>
            <RadioComponent label='un particulier'  name='type' value='particulier' onChange={(e)=>setUser({...user,type:e.target.value})} />
          </div>
          <div className={styles.formDivInputsDiv}>
            <InputComponent label='Nom' value={user.name} onChange={(e:any)=>setUser({...user,name:e.target.value})}/>
            <InputComponent label='Prenom' value={user.subName} onChange={(e:any)=>setUser({...user,subName:e.target.value})}/>
            <InputComponent type="email" label='E-mail' value={user.eMail} onChange={(e:any)=>setUser({...user,eMail:e.target.value})}/>
            <InputComponent label='Numéro de téléphone' value={user.phone} onChange={(e:any)=>setUser({...user,phone:e.target.value})}/>
            <SelectComponent label='Nationalité' data={data}  value={user.nation} onSelected={(value:any)=>setUser({...user,nation:value})}/>
          </div>
          <div>
            <CheckboxComponent label='J’atteste que je possède un permis de conduire valide.'  onChange={(e:any)=>setUser({...user,acceptCondi:e.target.checked})}/>
          </div>
          <div className={styles.demande}>
            <ButtonComponent onClick={HandleSubmit}>Demander mon inscription
            {
              isloading ? <img src="/loading.svg" className={styles.loading} alt="Chargement en cours" /> : ''
            }
            </ButtonComponent>

          </div>
        </form>
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
