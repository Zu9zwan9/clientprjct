import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

interface ThemeContextType {
    toggle: () => void;
    isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
    toggle: () => {
    }, isDark: false
});

export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setIsDarkMode(!isDarkMode);
    };

    const theme = useMemo(() => createTheme({
        palette: {
            mode: isDarkMode ? 'dark' : 'light',
        },
    }), [isDarkMode]);

    return (
        <ThemeContext.Provider value={{toggle: toggleDarkMode, isDark: isDarkMode}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};
