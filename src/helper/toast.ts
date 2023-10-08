import {notification} from "antd";

export function alertToast({type, message, title} : {
  type: 'success' | 'info' | 'warning' | 'error'
  title?: string
  message: string
}) {
  notification.open({
    message: title,
    description: message,
    type,
    placement: "bottomRight"
  });
}