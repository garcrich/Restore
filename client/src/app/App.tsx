import { useEffect, useState } from "react";
import { Product } from "./models/product";
import Catalog from "../features/catalog/Catalog";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./layout/Header";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
function App() {
  const [darkMode, setDarkMode] = useState(false)
  const paletteType = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212',
      }
    }
  })
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
