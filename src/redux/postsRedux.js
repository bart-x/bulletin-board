import axios from 'axios';

/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getPostById = ({ posts }, postId) => {
  const filteredPost = posts.data.filter(post => post._id === postId);
  return filteredPost.length ? filteredPost[0] : { error: true };
};

export const getPostsByUser = ({ posts, user }) => {
  const usersPost = posts.data.filter(post => post.email === user.email);
  console.log(usersPost);
  return usersPost;
};

/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');
const UPDATE_POST = createActionName('UPDATE_POST');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });
export const updatePost = payload => ({ payload, type: UPDATE_POST });

/* thunk creators */

export const fetchPublished = () => {
  return (dispatch, getState) => {
    try {
      const { posts } = getState();
      if (!posts.data.length || posts.loading.active === false) {
        dispatch(fetchStarted());
        axios.get('http://localhost:8000/api/posts').then((res) => {
          dispatch(fetchSuccess(res.data));
        });
      }
    } catch (err) {
      dispatch(fetchError(err.message || true));
    }
  };
};

export const addPostRequest = (post) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post(`http://localhost:8000/api/posts`, post);
      dispatch(addPost(res));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};

export const updatePostRequest = (id, data) => {
  return async dispatch => {
    dispatch(fetchStarted());
    try {
      let res = await axios.put(
        `http://localhost:8000/api/post/${id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      dispatch(updatePost(res.data));
    } catch (e) {
      dispatch(fetchError(e.message));
    }
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST: {
      return {
        ...statePart,
        data: [...statePart.data, {
          ...action.payload
        }],
        loading: {
          active: false,
          error: false,
        },
      };
    }
    case UPDATE_POST: {
      return {
        ...statePart,
        data: statePart.data.map(post => {
          return (post._id === action.payload._id ? { ...action.payload } : post);
        }),
      };
    }
    default:
      return statePart;
  }
};
