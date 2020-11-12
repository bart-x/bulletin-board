import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';
import { makeStyles } from '@material-ui/core/styles';
import styles from './PostAdd.module.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: '2rem',
  },
  form: {
    margin: theme.spacing(1),
    width: '25ch',
  },
}));

const Component = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <form className={classes.form} noValidate autoComplete="off">
        <div>
          <TextField
            id="outlined-textarea"
            label="Name"
            placeholder="Name"
            multiline
            variant="outlined"
          />
        </div>
      </form>
    </Container>
  );
};

Component.propTypes = {
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
