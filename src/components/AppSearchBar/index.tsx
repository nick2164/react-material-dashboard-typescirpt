import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase, { InputBaseComponentProps } from '@material-ui/core/InputBase';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';

interface AppSearchBarProps {
  title: string,
  searchWord: string,
  setSearchWord: (props: InputBaseComponentProps) => void
}

const AppSearchBar = (props: AppSearchBarProps) => {

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexGrow: 1
      },
      menuButton: {
        marginRight: theme.spacing(2)
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block'
        },
        color: 'inherit',
        overflow: 'visible'
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto'
        }
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      inputRoot: {
        color: 'inherit'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'), // TODO: See if this can get seamless with 100% in width on hover.
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 120,
          '&:focus': {
            width: '100%'
          }
        }
      }
    })
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h3" noWrap >
            {props.title}
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Søg…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'Søg' }}
              onKeyUp={props.setSearchWord}
              aria-valuetext={props.searchWord}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );


};

export default AppSearchBar;

