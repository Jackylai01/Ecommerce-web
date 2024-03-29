import { ReactNode, createContext, useContext, useState } from 'react';

type ColorModeProviderProps = {
  children: ReactNode;
};

const defaultContextValue = {
  colorMode: 'light',
  toggleColorMode: () => {},
};

const ColorModeContext = createContext(defaultContextValue);

export const useAdminColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider = ({ children }: ColorModeProviderProps) => {
  const [colorMode, setColorMode] = useState('light');
  const toggleColorMode = () =>
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};
