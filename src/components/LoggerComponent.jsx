import { useUsers } from "../hooks/useUsers";

const withLogged = (WrappedComponent) => {
  return function WithLogger(props) {
    const { user } = useUsers();

    if (user) {
      return <WrappedComponent {...props} />;
    } else {
      null;
    }
  };
};

export default withLogged;
