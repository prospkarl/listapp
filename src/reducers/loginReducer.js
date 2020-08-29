const loginReducer = (prevState, action) => {
  switch (action.type) {
    case 'AUTH':
      return {
        ...prevState,
        userEmail: action.userEmail,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...prevState,
        userEmail: null,
        isLoading: false,
      };
  }
};

export default loginReducer;