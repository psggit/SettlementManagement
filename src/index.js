import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'
import "Sass/app.scss"
import Login from "Container/login"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const history = createHistory()

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#f28933',
      main: '#EF6C00',
      dark: '#a74b00',
      contrastText: '#fff',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#000',
    },
  },
});
function App () {
  const [currentRoute, setCurrentRoute] = useState(location.pathname.split('/')[2] || '')
  const [key, setKey] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("hasura-id") ? true : false)
  
  useEffect(() => {
    history.listen((loction) => {
      const newRoute = location.pathname.split('/')[2]
      setKey(key + 1)
      setCurrentRoute(newRoute)
    })
  }, [key])

  return (
    <ThemeProvider theme={theme}>
      <Router history = { history } >
        <Route exact path="/login" component={Login} />
      </Router>  
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App