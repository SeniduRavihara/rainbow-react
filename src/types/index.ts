import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

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
  userMessages: messageObjType[] | null;
  locationArr: Array<{ location: string; id: string }> | null;
  setLocationArr: React.Dispatch<
    React.SetStateAction<Array<{ location: string; id: string }> | null>
  >;
};

// --------------------------------

export type messageObjType = {
  id: string;
  message: string;
  messageId: string;
  createdAt: Timestamp;
  imageUrl: string;
  fromName: string;
  fromId: string;
  toName: string;
  toId: string;
  seen: boolean;
};

// ---------------------------------

export type AuthContextType = {
  currentUser: User | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;
};

// ---------------------------------

export type CurrentUserDataType = {
  id: string;
  email: string;
  name: string;
  roles: string[];
  gender: string;
  haveStore: boolean;
} | null;

type ValuePiece = Date | string | null;
export type TimeValue = ValuePiece | [ValuePiece, ValuePiece];

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
  whatsappNumber: string;
  storeIcon: string;
  storeImages: string[];
  userId: string;
  info1: string;
  info2: string;
  published: boolean;
  schedulArr: Array<{ day: string; time: TimeValue }>;
  fasebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  website: string;
};

export type StoreListType = Array<StoreObj>;

export type ReviewObjType = {
  createdAt: Timestamp;
  imageUrl: string;
  userName: string;
  userId: string;
  review: string;
  rating: number;
  id: string;
};

export type ReviewListType = Array<ReviewObjType>;
