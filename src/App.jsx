import { RouterProvider } from "react-router-dom";
import router from "./Routes/Routes/Routes";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

export const ThemeContext = createContext();
export const DeviceContext = createContext();

function App() {
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

  const isSmallDevice = useMediaQuery({ maxWidth: 767 });
  const isMediumDevice = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  const isLargeDevice = useMediaQuery({ minWidth: 992 });

  const device = {
    isSmallDevice,
    isMediumDevice,
    isLargeDevice,
  }

  return (
    <DeviceContext.Provider value={{device}}>
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
    </DeviceContext.Provider>
  );
}

export default App;
