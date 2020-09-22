import * as React from 'react';
import { useContext, useState } from 'react';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { Drawer, AppBar, CssBaseline, Toolbar, IconButton, Typography,
  List, ListItem, ListItemIcon, ListItemText, Accordion, AccordionSummary, CircularProgress, Button, Hidden, Divider  } from '@material-ui/core';
import { Menu, ChevronLeft, ChevronRight, HowToReg } from '@material-ui/icons';
import AddBoxIcon from '@material-ui/icons/AddBox';
import Cancel from '@material-ui/icons/CancelPresentation';
import Swap from '@material-ui/icons/SwapVerticalCircle';
import { useHistory } from 'react-router-dom';
import { Context } from '../../Utils/Context';

const drawerWidth = 200;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      position: 'relative',
      minHeight: '80vh',
      backgroundColor: '#F5F5F5',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      backgroundColor: "primary",
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 0,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      // whiteSpace: 'nowrap',
      borderRight: 'none',
      borderTop:'none'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(8) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      overflowX: 'auto'
    },
    grow: {
      flexGrow: 1,
    }
  }),
);

export default function MiniDrawer({children}) {
  const classes = useStyles();
  const { loading, employeeInfos } = useContext(Context);
  const history = useHistory();
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const items = [
    {
      text: "New card",
      icon: <AddBoxIcon />,
      onClick: ()=> history.push("/newCreditCard")
    },
    {
      text: "Cancel Card",
      icon: <Cancel />,
      onClick: ()=> history.push("/cancelCard")
    },
    {
      text: "Limit change",
      icon:<Swap />,
      onClick: ()=> history.push("/limitChange")
    },
  ];


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div id="menuRoot" className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <Menu />
          </IconButton>
          <Button color="inherit" onClick={()=> history.push("/")}>
          <Typography color="inherit" variant="subtitle1" noWrap>
            Travel Support
          </Typography>
          </Button>
          <div className={classes.grow} />
          { employeeInfos && employeeInfos.isAdmin &&
            <Button color="inherit" onClick={()=> history.push("/support")}>
              <HowToReg color="inherit" fontSize='large'/>
            </Button>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        PaperProps={{ style: { position: 'absolute' } }}
        BackdropProps={{ style: { position: 'absolute' } }}
        ModalProps={{
          container: document.getElementById('menuRoot'),
          style: { position: 'absolute' }
        }}
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
          </IconButton>
        </div>
        <Divider />
        <Accordion defaultExpanded={true} square={true} >
          <AccordionSummary>
              <Typography variant="body2" align="center">Card Services</Typography>
        </AccordionSummary>
        <List style={{whiteSpace:"nowrap"}}>
          { items.map(item=>{
            const { icon, text, onClick } = item;
            return(
              <ListItem button key={text} onClick={onClick}>
              <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>
                  <Typography variant="caption"> { text } </Typography>
                </ListItemText>
              </ListItem>
            );
          }) }
        </List>
        </Accordion>
      </Drawer>

      <main className={classes.content}>
        <div className={classes.toolbar} />
        {
          loading ? <CircularProgress />: children
        }
      </main>
    </div>
  );
}
