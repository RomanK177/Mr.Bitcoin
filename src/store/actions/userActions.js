import { UserService } from '../../services/UserService';

export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await UserService.getUser();
      dispatch({ type: 'SET_USER', user });
      return user;
    } catch {
      return;
    }
  };
}

export function addUser(user) {
  return async (dispatch) => {
    const newUser = await UserService.signup(user);
    dispatch({ type: 'SAVE_USER', newUser });
  };
}

export function addMove(move) {
  return async (dispatch) => {
    const newUser = await UserService.addMove(move);
    dispatch({ type: 'SET_USER', user: newUser });
  };
}
