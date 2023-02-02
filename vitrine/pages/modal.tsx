import { Modal, Upload, ModalProps, Input } from "antd";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { LegacyButtonType } from "antd/es/button/button";
import React, { ReactNode, use, useState } from "react";
import { InputComponent } from "my-lib-ui";
import stylesAdmin from "../styles/admin.module.css";
import type { UploadFile } from "antd/es/upload/interface";
import type { RcFile, UploadProps } from "antd/es/upload";
import { PlusOutlined } from "@ant-design/icons";
import { addCarRequest } from "./api/car";

const { TextArea } = Input;
const { confirm } = Modal;
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export type confirmProps = {
  title: string;
  okText?: string;
  okType?: LegacyButtonType;
  cancelText?: string;
  content?: ReactNode;
  icon?: ReactNode;
  onOk?: () => void;
  onCancel?: () => void;
};

export const showConfirm = (params: confirmProps) => {
  const {
    onOk,
    onCancel,
    title,
    content,
    cancelText = "Annuler",
    okText = "Supprimer",
    okType = "danger",
    icon = <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
  } = params;
  confirm({
    centered: true,
    width: "500px",
    title: title,
    icon: icon,
    content: content,
    okText: okText,
    okType: okType,
    cancelText: cancelText,
    cancelButtonProps: {
      style: { color: "#40a9ff", borderColor: "#40a9ff" },
    },
    onOk: onOk,
    onCancel: onCancel,
  });
};
type NewCarProps = {
  open: boolean;
  onCancel: (open: boolean) => void;
};
export const NewCarFile: React.FC<
  ModalProps & { onSubmit: (car: any) => void }
> = (props) => {
  const { open, onCancel, onSubmit } = props;
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
  });
  const [file, setFile] = useState<RcFile | undefined>();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file: UploadFile) => {
    console.log("handlePreview", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };
  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    if (fileList.length) {
      setFile(fileList[0].originFileObj);
      setForm({
        ...form,
        image: fileList[0].name.replaceAll(" ", "_").replaceAll("-", "_"),
      });
    } else {
      setFile(undefined);
      setForm({ ...form, image: "" });
    }

    setFileList(newFileList);
  };
  const fix_name = (name: string, extend: string) => {
    const array_of_name = name.split(".");
    if (array_of_name.length > 1) array_of_name[array_of_name.length - 1] = "";
    return array_of_name.join("") + "." + extend;
  };
  const add = () => {
    if (file) {
      const type = file.type.split("/");
      form.image.split(".");
      const image_name = fix_name(form.image, type[1]);
      const data = new FormData();
      data.append("name", form.name);
      data.append("price", form.price);
      data.append("image", image_name);
      data.append("file", file as Blob, image_name);
      addCarRequest(data)
        .then((res) => onSubmit(res.car))
        .catch((err) => console.log("err", err));
    }
  };
  return (
    <Modal
      title="Ajouter une voiture"
      open={open}
      onOk={() => add()}
      onCancel={onCancel}
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
        <label className={stylesAdmin.label} htmlFor="prix">
          Prix (€) :
        </label>
        <InputComponent
          label="Prix"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />

        <label className={stylesAdmin.label}>Car image :</label>
        <div className={stylesAdmin.block_file}>
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length === 0 && (
              <div>
                <div>
                  <div className={stylesAdmin.file}>
                    <PlusOutlined />
                  </div>
                  <div style={{ marginTop: 8 }} className={stylesAdmin.file}>
                    Upload
                  </div>
                </div>
              </div>
            )}
          </Upload>
          {fileList.length === 1 && (
            <div className="w-50">
              <label className={stylesAdmin.label} htmlFor="image">
                Image :
              </label>
              <InputComponent
                label="Image name :"
                value={form.image}
                onChange={(e) =>
                  setForm({
                    ...form,
                    image: e.target.value
                      .replaceAll(" ", "_")
                      .replaceAll("-", "_"),
                  })
                }
              />
            </div>
          )}
        </div>
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </form>
    </Modal>
  );
};

const formInit = {
  name: "",
  image: "",
  price: "0.0",
  nb_palce: "4",
  description: "",
  franchise: "0.0",
  specification: "",
  km_jours: "0",
  plus_six: "0",
  trois_a_six: "0",
};
export const NewCar: React.FC<ModalProps & { onSubmit: (car: any) => void }> = (
  props
) => {
  const [detais, setDetails] = useState(false);
  const { open, onCancel, onSubmit } = props;
  const [data, setData] = useState(formInit);
  const add = () => {
    const { name, image, price } = data;
    if (name && image && price)
      addCarRequest(data)
        .then((res) => onSubmit(res.car))
        .catch((err) => console.log("err", err));
  };
  return (
    <Modal
      title="Ajouter une voiture"
      open={open}
      onOk={() => add()}
      onCancel={onCancel}
    >
      <form className={stylesAdmin.form}>
        <label className={stylesAdmin.label} htmlFor="nom">
          Nom :
        </label>
        <InputComponent
          label="Nom"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <label className={stylesAdmin.label} htmlFor="prix">
          Prix (€) :
        </label>
        <InputComponent
          label="Prix"
          value={data.price}
          type="number"
          onChange={(e) => setData({ ...data, price: e.target.value })}
        />
        <label className={stylesAdmin.label} htmlFor="prix">
          Image :
        </label>
        <InputComponent
          label="Url image"
          value={data.image}
          onChange={(e) => setData({ ...data, image: e.target.value })}
        />
        <label className={stylesAdmin.label} htmlFor="prix">
          Description :
        </label>
        <TextArea
          placeholder="description"
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
        />
        <div className={stylesAdmin.detais}>
          <div className={stylesAdmin.detais_opener}>
            <div onClick={() => setDetails(!detais)}>
              <span className={stylesAdmin.detais_text}>Details</span>
              {detais ? (
                <CaretUpOutlined style={{ color: "rgb(147, 152, 156)" }} />
              ) : (
                <CaretDownOutlined style={{ color: "rgb(147, 152, 156)" }} />
              )}
            </div>
          </div>
          {detais && (
            <div>
              <div className={stylesAdmin.detais_input}>
                <div>
                  <InputComponent
                    label="nombre places"
                    value={data.nb_palce}
                    type="number"
                    onChange={(e) =>
                      setData({ ...data, nb_palce: e.target.value })
                    }
                  />
                </div>
                <div>
                  <InputComponent
                    label="Specification"
                    value={data.specification}
                    onChange={(e) =>
                      setData({ ...data, specification: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={stylesAdmin.detais_input}>
                <div>
                  <InputComponent
                    label="Franchise (€)"
                    type="number"
                    value={data.franchise}
                    onChange={(e) =>
                      setData({ ...data, franchise: e.target.value })
                    }
                  />
                </div>
                <div>
                  <InputComponent
                    label="Km inclus / Jour (€)"
                    value={data.km_jours}
                    onChange={(e) =>
                      setData({ ...data, km_jours: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className={stylesAdmin.detais_input}>
                <div>
                  <InputComponent
                    label="3 - 6 jours (€)"
                    value={data.trois_a_six}
                    type="number"
                    onChange={(e) =>
                      setData({ ...data, trois_a_six: e.target.value })
                    }
                  />
                </div>
                <div>
                  <InputComponent
                    label="plus 6 jours (€)"
                    value={data.plus_six}
                    type="number"
                    onChange={(e) =>
                      setData({ ...data, plus_six: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
};
