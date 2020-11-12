import axios from 'axios';
/* selectors */
export const getAll = ({ posts }) => posts.data;

export const getPostById = ({ posts }, id) => {
  const filteredPost = posts.data.filter(post => post._id === id);
  return filteredPost.length ? filteredPost[0] : { error: true };
};
/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
const ADD_POST = createActionName('ADD_POST');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const addPost = payload => ({ payload, type: ADD_POST });

/* thunk creators */

export const addPostRequest = (post) => {
  return async (dispatch) => {
    dispatch(fetchStarted());
    try {
      let res = await axios.post('http://localhost:8000/api/posts/add', post);
      dispatch(addPost(res));
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
    default:
      return statePart;
  }
};
