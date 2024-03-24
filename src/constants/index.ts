
export const INITIAL_CURRENT_USER = {
  uid: "",
  email: "",
  name: "",
  photoURL: "",
};

export const INITIAL_AUTH_CONTEXT = {
  currentUser: INITIAL_CURRENT_USER,
  setCurrentUser: () => {},
  googleSignIn: () => {},
  logout: () => {},
};

