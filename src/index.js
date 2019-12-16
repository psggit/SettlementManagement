import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import { Router } from 'react-router'
import { Route, Switch } from 'react-router-dom'
import { createBrowserHistory as createHistory } from 'history'
import "Sass/app.scss"
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { menuItemsMap, supportMenuItems, menuItems } from 'Constants/navbar-items'
import Login from "Container/login"
import Home from "Container/home"
import Header from "Components/header"
import Sidemenu from "Components/sidemenu"

const history = createHistory()

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6676c1',
      main: '#4054B2',
      dark: '#2c3a7c',
      contrastText: '#000',
    },
    secondary: {
      light: '#f73378',
      main: '#f50057',
      dark: '#ab003c',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles(theme => ({
  content: {
    position: "relative",
    top: "105px",
    left: "245px"
  },
}));

function App () {
  const classes = useStyles();

  const [currentRoute, setCurrentRoute] = useState(location.pathname.split('/')[2] || '')
  const [key, setKey] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("hasura-id") ? true : false)
  
  useEffect(() => {
    history.listen((location) => {
      const newRoute = location.pathname.split('/')[2]
      setKey(key + 1)
      setCurrentRoute(newRoute)
    })
  }, [key])

  return (
    <ThemeProvider theme={theme}>
      <Router history = { history } >
        <Route exact path="/login" component={Login} />
        {
          isLoggedIn &&
          <div>
            <CssBaseline />
            <Header
              isLoggedIn={isLoggedIn}
              history={history}
            />
            <Sidemenu
              history={history}
              menuItems={menuItems}
              supportMenuItems={supportMenuItems}
              menuItemsMap={menuItemsMap}
              currentRoute={currentRoute}
            />
            <Switch>
              <div className={classes.content}>
                <Route exact path="/home/overview" component={Home} />
              </div>
            </Switch>
          </div>
        }
      </Router>  
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))

export default App