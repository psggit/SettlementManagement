import React from "react"
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Icon from "Components/icon"
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 245;

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
    top: "105px"
  },
  activeItem: {
    padding: "8px 24px",
    '&:hover': {
      backgroundColor: theme.palette.primary.light
    },
    '&.active': {
      backgroundColor: theme.palette.primary.light
    }
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    top: "105px"
  },
  label: {
    margin: "4px 0"
  },
  footer: {
    position: "fixed",
    bottom: "0",
    padding: "0 24px",
    paddingBottom: "8px",
    '& p': {
      fontSize: "22px",
      lineHeight: "27px",
      fontWeight: "600",
      textTransform: "uppercase",
      color: theme.palette.primary.main
    },
    '& p.version': {
      fontSize: "12px",
      lineHeight: "15px",
      textTransform: "lowercase",
      color: "rgba(0, 0, 0, 0.5)",
      fontStyle: "normal"
    }
  }
}));

function sidemenu({ menuItems, supportMenuItems, currentRoute, history }) {
  const classes = useStyles();

  const checkActiveClass = (selectedRoute) => {
    console.log("current", currentRoute, "selected", selectedRoute)
    if (currentRoute === selectedRoute) {
      return 'active'
    }
    return undefined
  }

  const handleChangeRoute = (e, selectedRoute) => {
    e.preventDefault()
    history.push(`/home/${selectedRoute}`)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List>
        {menuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.label} 
            className={`${classes.activeItem} ${checkActiveClass(item.value)} `}
            onClick={(e) => { handleChangeRoute(e, item.value) }}
          >
            <ListItemIcon>
              <Icon name={`${item.icon}`} />
            </ListItemIcon>
            <span className={classes.label}>{item.label}</span>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {supportMenuItems.map((item, index) => (
          <ListItem 
            button 
            key={item.label} 
            className={`${classes.activeItem} ${checkActiveClass(item.value)} `} 
          >
            <ListItemIcon>
              <Icon name={`${item.icon}`} />
            </ListItemIcon>
            <span className={classes.label}>{item.label}</span>
          </ListItem>
        ))}
      </List>
      <div className={classes.footer}>
        <p>Account</p>
        <p>Reconciliation</p>
        <p>Dashboard</p>
        <p className="version">version 1.3</p>
      </div>
    </Drawer>
  )
}

export default sidemenu