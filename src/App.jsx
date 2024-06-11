import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ThemeContext = createContext();
export const ModalContext = createContext();
export const ChatContext = createContext();

function App() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  const [showModal, setShowModal] = useState(false);
  const [receiver, setReceiver] = useState(null);

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
      <ChatContext.Provider value={{receiver, setReceiver}}>
        <ModalContext.Provider value={{ showModal, setShowModal }}>
          <ThemeContext.Provider value={{ theme, handleToggle }}>
            <RouterProvider router={router} />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              theme="light"
            />
          </ThemeContext.Provider>
        </ModalContext.Provider>
      </ChatContext.Provider>
    </div>
  );
}

export default App;
