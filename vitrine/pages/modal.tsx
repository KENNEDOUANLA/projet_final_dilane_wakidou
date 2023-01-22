import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { LegacyButtonType } from "antd/es/button/button";
import { ReactNode } from "react";
const { confirm } = Modal;
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
