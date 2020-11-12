import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SaveIcon from '@material-ui/icons/Save';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { NotFound } from '../../views/NotFound/NotFound';
import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux.js';
import styles from './PostAdd.module.scss';
import clsx from 'clsx';
import { withRouter } from 'react-router-dom';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        description: '',
        image: null,
        email: '',
      },
      isError: false
    };
  }

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
    user: PropTypes.object,
    history: PropTypes.object,
  }

  handleChange = ({ target }) => {
    const { post } = this.state;
    const { value, name } = target;
    this.setState({ post: { ...post, [name]: value } });
  };

  setImage = ({ target }) => {
    const { post } = this.state;
    const file = target.files;
    if (file) this.setState({ post: { ...post, image: file[0] } });
  };

  submitPost = async (e) => {
    const { post } = this.state;
    const { addPost, user } = this.props;

    e.preventDefault();
    if (post.title && post.description && post.image && post.email) {
      const formData = new FormData();

      for (let key of ['email', 'description', 'title', 'location', 'phone']) {
        formData.append(key, post[key]);
      }

      formData.append('image', post.image);
      formData.append('user', user._id);

      addPost(formData);
      this.props.history.push('/my-posts');
    } else this.setState({ isError: true });
  };


  render() {
    const { handleChange, setImage, submitPost } = this;
    const { user, className } = this.props;

    return (
      user.authenticated ? (
        <Container className={clsx(className, styles.root)}>
          <Typography className={styles.title} variant="h5" color="textSecondary" component="h2">
            Add new post
          </Typography>
          <form className={styles.form} noValidate autoComplete="off" onSubmit={submitPost}>
            <div className={styles.formBox}>
              <TextField
                className={styles.formBox}
                id="outlined-textarea"
                label="Notice title"
                placeholder="Notice title"
                multiline
                variant="outlined"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formBox}>
              <TextField
                className={styles.formBox}
                id="outlined-textarea"
                label="location"
                placeholder="location"
                multiline
                variant="outlined"
                onChange={handleChange}
              />
            </div>
            <div className={styles.formBox}>
              <TextField
                className={styles.formBox}
                id="outlined-textarea"
                label="e-mail"
                placeholder="e-mail"
                multiline
                variant="outlined"
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <input accept="image/*" className={styles.input} id="contained-button-file" type="file" />
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
                component="span">
                Upload image
              </Button>
            </label>
            <Button
              variant="contained"
              className={styles.button}
              color="secondary"
              startIcon={<SaveIcon />}
              type="submit"
            >
              Save
            </Button>
          </form>

        </Container>
      ) :
        (
          <NotFound />
        )
    );
  }
}

Component.propTypes = {
  className: PropTypes.string,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPostRequest(post)),
});

const ContainerComponent = connect(mapStateToProps, mapDispatchToProps)(withRouter(Component));

export {
  //Component as PostAdd,
  ContainerComponent as PostAdd,
  Component as PostAddComponent,
};
