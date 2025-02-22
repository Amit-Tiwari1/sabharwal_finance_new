
import { toast } from "react-toastify";

const useNotifications = () => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  const notifyWarning = (message: string) => {
    toast.warn(message);
  };

  return { notifySuccess, notifyError, notifyWarning };
};

export default useNotifications;
