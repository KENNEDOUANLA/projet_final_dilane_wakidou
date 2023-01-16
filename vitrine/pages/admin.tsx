import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import stylesAdmin from "../styles/admin.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ButtonComponent, TableComponent, RecordType } from "my-lib-ui";
import { Modal } from "antd";
import { WarningTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import { getUsers, valideUserRequest, deleteUserRequest } from "./api/user";

type dataType = {
  id: number;
  validee: boolean;
  type: string;
  nom: string;
  prenom: string;
  email: string;
  numero: string;
  nationalite: string;
  isloading?: boolean;
};
type ColumnsType = {};
export default function Home() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<dataType[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [deleted, setDeleted] = useState<number>(0);
  const [isloading, setIsLoading] = useState<number>(0);
  const [columns] = useState<RecordType[]>([
    {
      title: "Status",
      key: "valide",
      render: ({ validee }) => {
        return validee ? (
          <div>
            <CheckCircleTwoTone twoToneColor="#52c41a" className="large" />
            <span className="ml-2 bold">Validé</span>
          </div>
        ) : (
          <div>
            <WarningTwoTone twoToneColor="#ffc107" className="large" />
            <span className="ml-2 bold">En attente</span>
          </div>
        );
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Nom / Prénom",
      key: "nom",
      render: ({ nom, prenom }) => {
        return (
          <span>
            {nom} - {prenom}
          </span>
        );
      },
    },
    {
      title: "Coordonnées",
      key: "coordonnes",
      render: ({ email, numero }) => {
        return (
          <div>
            <div>{email}</div>
            <div>{numero}</div>
          </div>
        );
      },
    },
    {
      title: "Nationalité",
      dataIndex: "nationalite",
      key: "nationalite",
    },
    {
      title: "Actions",
      key: "action",
      render: ({ id, validee, isloading }) => {
        return validee ? (
          <div>
            <ButtonComponent
              style={{
                backgroundColor: "#000000",
                fontSize: "0.75rem",
                height: "30px",
                borderRadius: "3px",
                color: "white",
              }}
            >
              Editer
            </ButtonComponent>
            <ButtonComponent
              onClick={() => deleteUser(id)}
              style={{
                backgroundColor: "rgb(192, 0, 0)",
                fontSize: "0.75rem",
                height: "30px",
                borderRadius: "3px",
                color: "white",
                marginTop: "0.25rem",
              }}
            >
              Supprimer
            </ButtonComponent>
          </div>
        ) : (
          <ButtonComponent
            onClick={() => validateUser(id)}
            style={{
              backgroundColor: "#C00000",
              fontSize: "0.75rem",
              height: "30px",
              borderRadius: "3px",
              color: "white",
            }}
          >
            Valider
            {isloading && (
              <img
                src="/loading.svg"
                className="loading"
                alt="Chargement en cours"
              />
            )}
          </ButtonComponent>
        );
      },
    },
  ]);

  const deleteUser = (id: number) => {
    Modal.info({
      title: "Suppression de l'utilisateur",
      content: <div>Souhaitez-vous Supprimer cet utilisateur ?</div>,
      onOk: () => setDeleted(id), //,
    });
  };

  const validateUser = (id: number) => {
    Modal.info({
      title: "Validation de l'utilisateur",
      content: <div>Souhaitez-vous valider cet utilisateur ?</div>,
      onOk: () => HandleSubmit(id), //,
    });
  };
  const HandleSubmit = (id: number) => {
    const _token = localStorage.getItem("token");
    if (_token) {
      setIsLoading(id);
      valideUserRequest(_token, id).then((_data: any) => {
        const { user } = _data;
        setIsLoading(0);
        if (user.id) {
          setUpdate(id);
        }
      });
    } else router.push("/connexion");
  };
  useEffect(() => {
    if (update) {
      setDataSource(
        dataSource.map((data) =>
          data.id === update
            ? { ...data, validee: true, isloading: false }
            : data
        )
      );
      setUpdate(0);
    } else if (deleted) {
      setDataSource(dataSource.filter((data) => data.id !== deleted));
      setDeleted(0);
    }
  }, [update, deleted, dataSource]);

  useEffect(() => {
    const _token = localStorage.getItem("token");
    if (_token) {
      getUsers(_token)
        .then((res) => {
          const { users } = res;
          if (users) setDataSource(users.reverse());
          else router.push("/connexion");
        })
        .catch((err) => console.log("erro", err));
    } else {
      router.push("/connexion");
    }
  }, []);
  useEffect(() => {
    if (isloading) {
      setDataSource(
        dataSource.map((data) =>
          data.id === isloading ? { ...data, isloading: true } : data
        )
      );
    }
  }, [isloading]);

  return (
    <div className={stylesAdmin.page}>
      <Head>
        <title>Final project</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="navbar">
        <div className={styles.logo}>
          <Image
            src="/logo_eval.png"
            alt="Vercel Logo"
            className={styles.logo_image}
            width={100}
            height={200}
          />
        </div>
        <div></div>
        <ButtonComponent onClick={() => router.push("/connexion")}>
          Connexion admin
        </ButtonComponent>
      </nav>
      <div className={stylesAdmin.container}>
        <h1>Admin page</h1>
        <div className={stylesAdmin.tablesDiv}>
          <div>
            <h2>Utilisateurs</h2>
            <TableComponent
              dataSource={dataSource}
              columns={columns}
              pagination={{ pageSize: 5 }}
            />
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
  );
}
