import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProvider from "./hooks/useProvider";
import { AuthContext } from "./contexts/AuthProvider";
import useAdmin from "./hooks/useAdmin";
import Loader from "./Components/Loader/Loader";

export const ThemeContext = createContext();
export const ModalContext = createContext();
export const ChatContext = createContext();
export const ProviderContext = createContext();
export const AdminContext = createContext();

function App() {
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [receiver, setReceiver] = useState(null);

  const [isProvider, isProviderLoading] = useProvider(user?.uid);
  const [isAdmin, isAdminLoading] = useAdmin(user?.uid);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    const localTheme = localStorage.getItem("theme");
    document.querySelector("html").setAttribute("data-theme", localTheme);
  }, [theme]);

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <div className={`${showModal && "max-h-screen overflow-hidden"}`}>
      <ThemeContext.Provider value={{ theme, handleToggle }}>
        <AdminContext.Provider value={{ isAdmin, isAdminLoading }}>
          <ProviderContext.Provider value={{ isProvider, isProviderLoading }}>
            <ChatContext.Provider value={{ receiver, setReceiver }}>
              <ModalContext.Provider value={{ showModal, setShowModal }}>
                 <RouterProvider router={router} /> 
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
