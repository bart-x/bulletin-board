import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

import styles from './Header.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  radio: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  menuButton: {
    marginRight: theme.spacing(2),
  },

  title: {
    flexGrow: 1,
  },

  login: {
    textDecoration: 'none',
    color: 'white',
  },
}));


const Component = ({ className, user }) => {
  const classes = useStyles();

  if (user.authenticated) {
    return (
      <div className={clsx(className, styles.root)}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bulletin board
            </Typography>

            <Button color="inherit">
              <Link
                to='/login'
                className={classes.login}
              >Logout</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  } else {
    return (
      <div className={clsx(className, styles.root)}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Bulletin board
            </Typography>

            <Button color="inherit">
              <Link
                to='http://google.com'
                className={classes.login}
              >Login with google</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
};

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ComponentContainer = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  ComponentContainer as Header,
  Component as HeaderComponent,
};
