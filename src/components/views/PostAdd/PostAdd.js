import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import SaveIcon from '@material-ui/icons/Save';
import { connect } from 'react-redux';
import { addPostRequest } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux.js';
import styles from './PostAdd.module.scss';
import { withRouter } from 'react-router-dom';

class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: {
        title: '',
        description: '',
        image: null,
      },
      error: null
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
    const { addPost } = this.props;

    e.preventDefault();
    if (post.title && post.description && post.image) {
      await addPost(post);
      this.setState({
        post: {
          title: '',
          description: '',
          image: null,
        },
        error: null
      });
    } else this.setState({ isError: true });
  };


  render() {

    return (
      <Container className={styles.root}>
        <Typography className={styles.title} variant="h5" color="textSecondary" component="h2">
          Add new post
        </Typography>
        <form className={styles.form} noValidate autoComplete="off" onSubmit={this.submitPost}>
          <div className={styles.formBox}>
            <TextField
              className={styles.formBox}
              id="outlined-textarea"
              label="Notice title"
              placeholder="Notice title"
              multiline
              variant="outlined"
              onChange={this.handleChange}
            />
          </div>
        </form>
        <form className={styles.form} noValidate autoComplete="off">
          <div className={styles.formBox}>
            <TextField
              className={styles.formBox}
              id="outlined-textarea"
              label="Description"
              placeholder="Description"
              rows={4}
              multiline
              variant="outlined"
              onChange={this.handleChange}
            />
          </div>
        </form>
        <form className={styles.buttons} noValidate autoComplete="off">
          <input accept="image/*" className={styles.input} id="contained-button-file" type="file" />
          <label
            htmlFor="contained-button-file"
            className={styles.label}
            label="upload image"
            onChange={this.setImage}
          >
            <Button
              color="primary"
              aria-label="upload picture"
              variant="contained"
              startIcon={<PhotoCamera />}
              component="span"
              size="large">
              Upload image
            </Button>
          </label>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            size="large"
          >
            Save
          </Button>
        </form>

      </Container>
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
