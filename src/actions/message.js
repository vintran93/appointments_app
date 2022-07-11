import { SET_MESSAGE } from './permit';

export const setMessage = message => ({
  type: SET_MESSAGE,
  payload: message,
});

// use this export to dispatch action