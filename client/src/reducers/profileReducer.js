import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  CLEAR_CURRENT_PROFILE,
} from "../actions/type";

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
