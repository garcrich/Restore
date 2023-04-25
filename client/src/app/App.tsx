import { useEffect, useState } from "react";
import { Container, CssBaseline, createTheme } from "@mui/material";
import Header from "./layout/Header";
import { ThemeProvider } from "@emotion/react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useStoreContext } from "./context/StoreContext";
import agent from "./api/agent";
import LoadingComponent from "./layout/LoadingComponent";
import { useCookies } from "react-cookie";

function App() {
  const {setBasket} = useStoreContext();
  const [loading, setLoading] = useState(true);
  const [buyerId, setBuyerId] = useCookies(['buyerId']);

  useEffect(() => {
    if(buyerId) {
      agent.Basket.get()
        .then(basket => { setBasket(basket)})
        .catch(err => console.log(err))
        .finally(() => setLoading(false))
    }
  },[]);
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

  if(loading) return <LoadingComponent message="Initalizing app..."/>
  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <CssBaseline />
      <Header setDarkMode={setDarkMode} darkMode={darkMode}/>
      <Container>
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}

export default App;
