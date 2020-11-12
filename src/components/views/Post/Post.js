import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Post.module.scss';

const Component = ({ className, imgSrc, title, author, description, date_publ }) => (
  <div className={clsx(className, styles.root)}>
    <h1 className={styles.BoardTitle}>{title}</h1>
    <div className={styles.BoardImg}>
      <img src={imgSrc} alt={title} />
    </div>
    <div className={styles.BoardData}>Author: {author}</div>
    <div className={styles.BoardData}>Description: {description}</div>
    <div className={styles.BoardData}>Publication date: {date_publ}</div>
  </div>
);

Component.propTypes = {
  className: PropTypes.string,
  imgSrc: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.string,
  description: PropTypes.string,
  date_publ: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as Post,
  // Container as Post,
  Component as PostComponent,
};
