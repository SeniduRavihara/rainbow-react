
// export type dataContextType = {
//   newsList: newsListType;
//   lastNews: newsObjType;
//   selectedNews: newsObjType;
//   setSelectedNews: React.Dispatch<React.SetStateAction<newsObjType>>;
//   fetchData: () => void;
//   firstLoading: boolean;
//   loading: boolean;
// };

// ---------------------------------

export type authContextType = {
  currentUser: currentUserType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<currentUserType | null>>;
  googleSignIn: () => void;
  logout: () => void;
};

export type currentUserType = {
  uid: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
  likedPostsId?: Array<string> | undefined;
  unlikedPostsId?: Array<string> | undefined;
};

