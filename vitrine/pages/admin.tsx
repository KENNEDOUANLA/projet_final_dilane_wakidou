import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import stylesAdmin from "../styles/admin.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  ButtonComponent,
  TableComponent,
  RecordType,
  InputComponent,
} from "my-lib-ui";
import { Modal, Input } from "antd";
import { WarningTwoTone, CheckCircleTwoTone } from "@ant-design/icons";
import { getUsers, valideUserRequest, deleteUserRequest } from "./api/user";
import { getCars, addCarRequest, deleteCarRequest } from "./api/car";
import { Url } from "url";
import { showConfirm } from "./modal";

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
type Car = {
  id: number;
  name: string;
  image: string;
  price: string;
};
type ColumnsType = {};
export default function Home() {
  const router = useRouter();
  const [dataSource, setDataSource] = useState<dataType[]>([]);
  const [carsDataSource, setCarsDataSource] = useState<Car[]>([]);
  const [update, setUpdate] = useState<number>(0);
  const [deleted, setDeleted] = useState<number>(0);
  const [carDeleted, setCarDeleted] = useState<number>(0);
  const [isloading, setIsLoading] = useState<number>(0);
  const [isAddCarModalOpen, setIsAddCarModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", image: "", price: "" });
  const [carsColumns] = useState<RecordType[]>([
    {
      title: "Nom",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: ({ image }) => {
        return <img src={image} width="150px" height="150px" alt="" />;
      },
    },
    {
      title: "Prix",
      dataIndex: "price",
      key: "price",
      render: ({ price }) => <span> {price} €</span>,
    },
    {
      title: "Supprimer",
      dataIndex: "supprimer",
      key: "supprimer",
      render: ({ id }) => {
        return (
          <ButtonComponent
            onClick={() => deleteCar(id)}
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
        );
      },
    },
  ]);
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

  const addCar = () => {
    addCarRequest(form).then(({ car }) => {
      setCarsDataSource([...carsDataSource, car]);
      setIsAddCarModalOpen(false);
    });
  };

  const deleteUser = (id: number) => {
    showConfirm({
      title: "Suppression de l'utilisateur",
      content: <div>Souhaitez-vous supprimer cet utilisateur ?</div>,
      okText: "Supprimer",
      okType: "danger",
      onOk: () => HandleDelete(id),
    });
  };
  const deleteCar = (id: number) => {
    showConfirm({
      title: "Suppression de la voiture",
      content: <div>Souhaitez-vous supprimer cet voiture ?</div>,
      okText: "Supprimer",
      okType: "danger",
      onOk: () => HandleDeleteCar(id),
    });
  };

  const validateUser = (id: number) => {
    showConfirm({
      title: "Validation de l'utilisateur",
      content: <div>Souhaitez-vous valider cet utilisateur ?</div>,
      okText: "Validé",
      okType: "primary",
      onOk: () => HandleSubmit(id),
    });
  };

  const HandleDelete = (id: number) => {
    deleteUserRequest(id)
      .then((res) => console.log("----", res))
      .catch((err) => console.log("err", err));
    setDeleted(id);
  };

  const HandleDeleteCar = (id: number) => {
    console.log(id);
    deleteCarRequest(id)
      .then((res) => setCarDeleted(id))
      .catch((err) => setCarDeleted(0));
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
    } else if (carDeleted) {
      setCarsDataSource(
        carsDataSource.filter((data) => data.id !== carDeleted)
      );
      setCarDeleted(0);
    }
  }, [update, deleted, carDeleted, dataSource]);

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
      getCars(_token).then((res) => {
        const { cars } = res;
        if (cars) setCarsDataSource(cars.reverse());
      });
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
      <div className={stylesAdmin.tablesDiv}>
        <div>
          <h2>Voitures</h2>
          <ButtonComponent
            style={{
              backgroundColor: "#000000",
              fontSize: "0.75rem",
              height: "30px",
              width: "150px",
              borderRadius: "3px",
              color: "white",
            }}
            onClick={() => setIsAddCarModalOpen(true)}
          >
            Ajouter une voiture
          </ButtonComponent>
          <Modal
            title="Ajouter une voiture"
            open={isAddCarModalOpen}
            onOk={() => addCar()}
            onCancel={() => setIsAddCarModalOpen(false)}
          >
            <form className={stylesAdmin.form}>
              <label className={stylesAdmin.label} htmlFor="nom">
                Nom :
              </label>
              <InputComponent
                label="Nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label className={stylesAdmin.label} htmlFor="image">
                Image (URL) :
              </label>
              <InputComponent
                label="Image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
              <label className={stylesAdmin.label} htmlFor="prix">
                Prix (€) :
              </label>
              <InputComponent
                label="Prix"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </form>
          </Modal>
          <TableComponent
            dataSource={carsDataSource}
            columns={carsColumns}
            pagination={{ pageSize: 5 }}
          />
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
