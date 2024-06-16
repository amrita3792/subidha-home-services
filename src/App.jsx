import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProvider from "./hooks/useProvider";
import { AuthContext } from "./contexts/AuthProvider";
import useAdmin from "./hooks/useAdmin";
import { useTheme } from "./hooks/useTheme";
import Loader from "./Components/Loader/Loader";

export const ThemeContext = createContext();
export const ModalContext = createContext();
export const ChatContext = createContext();
export const ProviderContext = createContext();
export const AdminContext = createContext();

function App() {
  // const [theme, setTheme] = useState(
  //   localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  // );

  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [receiver, setReceiver] = useState(null);

  const [isThemeLoading, theme, handleToggle] = useTheme();
  const [isProvider, isProviderLoading] = useProvider(user?.uid);
  const [isAdmin, isAdmingLoading] = useAdmin(user?.uid);


  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 200);
  }, []);

  return (
    <div className={`${showModal && "max-h-screen overflow-hidden"}`}>
      <ThemeContext.Provider value={{ theme, handleToggle }}>
      <AdminContext.Provider value={{ isAdmin, isAdmingLoading }}>
        <ProviderContext.Provider value={{ isProvider, isProviderLoading }}>
          <ChatContext.Provider value={{ receiver, setReceiver }}>
            <ModalContext.Provider value={{ showModal, setShowModal }}>
             {(isProviderLoading || isAdmingLoading || isThemeLoading) ? <Loader /> : <RouterProvider router={router} />}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                theme="light"
              />
            </ModalContext.Provider>
          </ChatContext.Provider>
        </ProviderContext.Provider>
      </AdminContext.Provider>
      </ThemeContext.Provider>
    </div>
  );
}

export default App;



