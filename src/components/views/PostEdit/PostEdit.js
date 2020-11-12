import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';

import { connect } from 'react-redux';
import { getPostById, updatePostRequest } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux.js';
import { withRouter } from 'react-router-dom';
import styles from './PostEdit.module.scss';

class Component extends React.Component {
  state = {
    postData: {
      id: this.props.post._id,
      title: this.props.post.title,
      description: this.props.post.description,
      email: this.props.post.email,
      image: this.props.post.image,
      phone: this.props.post.phone,
      location: this.props.post.location,
    },
    isError: false,
  };

  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    user: PropTypes.object,
    updatePost: PropTypes.func,
    history: PropTypes.object,
  };

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  };

  setImage = ({ target }) => {
    const { postData } = this.state;
    const files = target.files;

    if (files) this.setState({ postData: { ...postData, image: files[0] } });
  };

  submitPost = async (e) => {
    const { postData } = this.state;
    const { updatePost } = this.props;

    e.preventDefault();

    if (postData.title && postData.description && postData.email) {
      const formData = new FormData();
      for (let key of ['email', 'title', 'description', 'location', 'phone']) {
        formData.append(key, postData[key]);
      }
      formData.append('image', postData.image);
      updatePost(postData.id, formData);
      this.props.history.push(`/post/${postData.id}`);
    } else this.setState({ isError: true });
  };
  render() {
    const { updateInputValue, submitPost, setImage } = this;
    const { postData } = this.state;
    const { post, user } = this.props;

    return (
      <Container className={styles.root}>
        <Typography
          className={styles.title}
          variant="h5"
          color="textSecondary"
          component="h2"
        >
          Post edit
        </Typography>
        <form
          onSubmit={submitPost}
          className={styles.form}
          noValidate
          autoComplete="off"
        >
          <div className={styles.formBox}>
            <TextField
              className={styles.formBox}
              id="outlined-textarea"
              label="Title"
              placeholder="Notice title"
              multiline
              variant="outlined"
              value={postData.title}
              onChange={updateInputValue}
            />
          </div>
          <div className={styles.formBox}>
            <TextField
              className={styles.formBox}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              rows={4}
              multiline
              variant="outlined"
              value={postData.description}
              onChange={updateInputValue}
            />
          </div>
          <div className={styles.formBox}>
            <TextField
              className={styles.formBox}
              id="outlined-textarea"
              label="Status"
              placeholder="Status"
              rows={1}
              multiline
              variant="outlined"
              value={post.status}
            />
          </div>
          <input
            accept="image/*"
            className={styles.input}
            id="contained-button-file"
            type="file"
          />
          <label
            htmlFor="contained-button-file"
            className={styles.label}
            label="upload image"
            onChange={setImage}
          >
            <Button
              color="primary"
              className={styles.button}
              aria-label="upload picture"
              variant="contained"
              startIcon={<PhotoCamera />}
              component="span"
              size="large"
            >
              Upload image
            </Button>
          </label>
          <Button
            type="submit"
            className={styles.button}
            variant="contained"
            color="secondary"
            startIcon={<TrendingUpIcon />}
            size="large"
          >
            Update Post
          </Button>
        </form>
      </Container>
    );
  }
}
Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  updatePost: (id, data) => dispatch(updatePostRequest(id, data)),
});

const ContainerComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Component));

export {
  // Component as PostEdit,
  ContainerComponent as PostEdit,
  Component as PostEditComponent,
};
