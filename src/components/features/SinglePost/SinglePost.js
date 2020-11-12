import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import Col from 'react-bootstrap/Col';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import { NavLink } from 'react-router-dom';

import styles from './SinglePost.module.scss';

const Component = (post, { className }) => (
  <Col xs={12} md={6} lg={4} key={post._id}>
    <div {...post} className={clsx(className, styles.root)}>
      <NavLink exact to={`/post/${post._id}`}>
        <Card className={styles.Card}>
          <CardMedia
            className={styles.BoardImg}
            component="img"
            image={post.image}
            title={post.title}
          />
          <CardContent>
            <Typography component="h3">{post.title}</Typography>
            <Typography component="p">
              Description {post.description}
            </Typography>
          </CardContent>
        </Card>
      </NavLink>
    </div>
  </Col>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
};

export {
  Component as SinglePost,
  // Container as SinglePost,
  Component as SinglePostComponent,
};
