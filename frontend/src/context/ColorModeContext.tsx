import React, { createContext } from 'react'

interface ColorModeContextProps {
  toggleColorMode: () => void;
}

const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {}, 
})

export default ColorModeContext