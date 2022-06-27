import {
  DOCTORS_SUCCESS,
  DOCTORS_FAIL,
} from '../actions/permit';

export default function user(state = { doctors: [] }, action) {
  const { type, payload } = action;

  switch (type) {
    case DOCTORS_SUCCESS:
      return {
        ...state,
        doctors: payload.doctors,
      };
    case DOCTORS_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
