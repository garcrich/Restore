import { AppBar, Switch, Toolbar, Typography } from "@mui/material";

interface Props {
  setDarkMode: (darkMode: boolean) => void,
  darkMode: boolean
}

export default function Header({setDarkMode, darkMode}: Props) {
  function handleSwitch() {
    setDarkMode(!darkMode)
  }
  return (
    <AppBar position='static' sx={{mb: 4}}>
      <Toolbar>
        <Typography variant='h6'>React Store</Typography>
        <Switch onChange={handleSwitch}/>
      </Toolbar>
    </AppBar>
  )
}