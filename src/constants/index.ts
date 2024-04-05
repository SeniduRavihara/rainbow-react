export const INITIAL_CURRENT_USER_DATA = {
  id: "",
  email: "",
  name: "",
  roles: [""],
};

export const INITIAL_AUTH_CONTEXT = {
  currentUser: null,
  setCurrentUser: () => {},
};

export const INITIAL_DATA_CONTEXT = {
  currentUserData: null,
  setCurrentUserData: () => {},
  sectionAdds: null,
  sliderAdds: null,
  popularBrands: null,
  searchResultStores: null,
  setSearchResultStores: () => {},
  searchItem: "",
  setSearchitem: () => {},
  location: "",
  setLocation: () => {},
  loadingStoreFetching: false,
  setLoadingStoreFetching: () => {},
  lastDocument: null,
  setLastDocument: () => {},
};
