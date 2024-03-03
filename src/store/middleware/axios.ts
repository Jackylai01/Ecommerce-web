import { Middleware } from 'redux';

const interceptAxiosErrorsMiddleware: Middleware = ({ dispatch }) => {
  return (next) => (action) => {
    if (action.type.endsWith('rejected')) {
      // dispatch(adminLogoutAsync() as unknown as AnyAction);
    }

    next(action);
  };
};

export default interceptAxiosErrorsMiddleware;
