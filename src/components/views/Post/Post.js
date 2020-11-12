import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import clsx from 'clsx';
import { getPostById } from '../../../redux/postsRedux.js';
import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux';

import styles from './Post.module.scss';
import { NavLink } from 'react-router-dom';

const Component = ({ className, _id, user, author, description, date_publ, price, email, title, image }) => (

  <div className={clsx(className, styles.root)}>
    <NavLink exact to={`/post/${_id}`} className={styles.link}>
      <h1 className={styles.BoardTitle}>{title}</h1>
      <div className={styles.BoardImg}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.BoardData}>Author: {author}</div>
      <div className={styles.BoardData}>Description: {description}</div>
      <div className={styles.BoardData}>Publication date: {date_publ}</div>
      <div className={styles.BoardData}>Price: {price}$</div>
      <div className={styles.BoardData}>Contact: {email}</div>
    </NavLink>
    { user.authenticated && email === user.email && (
      <div className={styles.buttons}>
        <Fab color="primary" aria-label="edit" className={styles.button}>
          <NavLink exact to={`/post/${_id}/edit`} className={styles.edit}>
            <EditIcon />
          </NavLink>
        </Fab>
        <Fab color="primary" aria-label="edit" className={styles.button}>
          <DeleteIcon />
        </Fab>
      </div>
    )};
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
  author: PropTypes.string,
  description: PropTypes.string,
  date_publ: PropTypes.string,
  price: PropTypes.number,
  email: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  _id: PropTypes.string,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  post: getPostById(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ComponentContainer = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  ComponentContainer as Post,
  Component as PostComponent,
};
