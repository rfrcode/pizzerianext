import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import { useContext } from 'react';
import User from '../components/user';
import { drawerWidth } from './menu';
import MenuContext from './menucontext';
import Search from './search';

const useStyles = makeStyles((theme) => ({
   
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
    },
}));
export default function appBar() {
    const { handleDrawerToggle } = useContext(MenuContext);
    const classes = useStyles()
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton}
                    color="inherit" aria-label="menu"
                    onClick={handleDrawerToggle}
                >
                    <MenuIcon />
                </IconButton>
                <Search></Search>
                <User></User>
            </Toolbar>
        </AppBar>
  
    )
}