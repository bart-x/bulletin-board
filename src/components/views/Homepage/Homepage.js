import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../Post/Post';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';
import Container from '@material-ui/core/Container';


const Component = ({ className, posts }) => {
  return (
    <Container className={clsx(styles.Posts, styles.root)}>
      {posts.map((post) => (
        <div key={post._id} className={styles.Post}>
          <Post {...post}></Post>
        </div>
      ))}
    </Container>
  );
};

Component.propTypes = {
  posts: PropTypes.any,
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  posts: getAll(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const ComponentContainer = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  ComponentContainer as Homepage,
  Component as HomepageComponent,
};
