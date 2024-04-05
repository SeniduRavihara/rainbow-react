import { User } from "firebase/auth";

export type DataContextType = {
  currentUserData: CurrentUserDataType;
  setCurrentUserData: React.Dispatch<React.SetStateAction<CurrentUserDataType>>;
  sectionAdds: Array<{
    imageUrl: string;
    id: string;
  }> | null;
  sliderAdds: Array<{
    imageUrl: string;
    id: string;
  }> | null;
  popularBrands: Array<{
    imageUrl: string;
    id: string;
  }> | null;
  searchResultStores: StoreListType | null;
  setSearchResultStores: React.Dispatch<
    React.SetStateAction<StoreListType | null>
  >;
  searchItem: string;
  setSearchitem: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  loadingStoreFetching: boolean;
  setLoadingStoreFetching: React.Dispatch<React.SetStateAction<boolean>>;
  lastDocument: StoreObj | null;
  setLastDocument: React.Dispatch<React.SetStateAction<StoreObj | null>>;
  isAllFetched: boolean;
  setIsAllFetched: React.Dispatch<React.SetStateAction<boolean>>;
};

// ---------------------------------

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

export type CurrentUserDataType = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  gender: string;
} | null;

export type StoreObj = {
  id: string;
  title: string;
  active: boolean;
  address: string;
  email: string;
  // messages: string[];
  tags: string[];
  createdAt: Date;
  phoneNumber: string;
  whatssappNumber: string;
  storeIcon: string;
  storeImages: string[];
  userId: string;
};

export type StoreListType = Array<StoreObj>;

// export type StoreListDocType = {
//   title: string;
//   active: boolean;
//   address: string;
//   email: string;
//   // messages: string[];
//   tags: string[];
//   createdAt: Date;
//   phoneNumber: string
//   whatssappNumber: string;
//   storeIcon: string;
//   storeImages: string[]
//   userId: string
// };
