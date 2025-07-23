import React, { createContext, useState, useRef, children, useContext } from "react";
import { LightTheme, DarkTheme } from "./Theme";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [theme, settheme] = useState(LightTheme);

    const toggleTheme = () =>{
        settheme(theme.mode === 'light' ? DarkTheme : LightTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
