import { useEffect, useState } from "react";

export const useTheme = () => {
    const [isThemeLoading, setIsThemeLoading] = useState(true);
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
      );
    useEffect(() => {
        localStorage.setItem("theme", theme);
        const localTheme = localStorage.getItem("theme");
        document.querySelector("html").setAttribute("data-theme", localTheme);
        setIsThemeLoading(false);
      }, [theme]);
    
      const handleToggle = (e) => {
        if (e.target.checked) {
          setTheme("dark");
        } else {
          setTheme("light");
        }
      };

      return [isThemeLoading, theme, handleToggle];
    
}