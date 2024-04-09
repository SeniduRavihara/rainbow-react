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
  isAllFetched: false,
  setIsAllFetched: () => {},
  messagesToAll: null,
};

export const INITIAL_SCHEDULAR_ARR = [
  { day: "Monday", time: ["08:00", "05:00"] },
  { day: "Tuesday", time: ["08:00", "05:00"] },
  { day: "Wednesday", time: ["08:00", "05:00"] },
  { day: "Thursday", time: ["08:00", "05:00"] },
  { day: "Friday", time: ["08:00", "05:00"] },
  { day: "Saturday", time: ["08:00", "05:00"] },
  { day: "Sunday", time: ["08:00", "05:00"] },
]; 