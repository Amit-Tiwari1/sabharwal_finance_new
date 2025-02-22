
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick draggable pauseOnHover />
      {children}
    </>
  );
};

export default NotificationProvider;
