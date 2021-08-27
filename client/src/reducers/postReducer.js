import {
  ADD_POST,
  GET_POSTS,
  PROFILE_LOADING,
  DELETE_POST,
  GET_POST,
} from "../actions/type";

const initialState = {
  posts: [],
  post: {},
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  console.log("actions coming in ===>>>", { action });
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };

    case PROFILE_LOADING:
      return { ...state, loading: true };

    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        ...state.posts,
        loading: false,
      };
    case GET_POST:
      return { ...state, post: action.payload, loading: false };

    default:
      return state;
  }
}
