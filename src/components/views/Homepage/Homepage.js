import React from 'react';
import PropTypes from 'prop-types';
import { Post } from '../Post/Post';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchPublished } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';
import Container from '@material-ui/core/Container';

class Component extends React.Component {
  componentDidMount() {
    const { fetchPublishedPosts } = this.props;
    fetchPublishedPosts();
  }
  render() {
    const { posts } = this.props;

    return (
      <Container className={clsx(styles.Posts, styles.root)}>
        {posts.map((post) => (
          <div key={post._id} className={styles.Post}>
            <Post key={post._id} {...post}></Post>
          </div>
        ))}
      </Container>
    );
  }
}
Component.propTypes = {
  posts: PropTypes.array,
  fetchPublishedPosts: PropTypes.func,
};

const mapStateToProps = (state) => ({
  posts: getAll(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPublishedPosts: () => dispatch(fetchPublished()),
});

const ComponentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Component);

export {
  //Component as Homepage,
  ComponentContainer as Homepage,
  Component as HomepageComponent,
};
