import { User } from "firebase/auth";
import { Timestamp } from "firebase/firestore";

export type DataContextType = {
  currentUserData: CurrentUserDataType;
  setCurrentUserData: React.Dispatch<React.SetStateAction<CurrentUserDataType>>;
  sectionAdds: Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null;
  sectionStaticAdds: Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null;
  sliderAdds: Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null;
  searchResultSliderAdds: Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null;
  detailsPageSliderAdds: Array<{
    imageUrl: string;
    id: string;
    link: string;
  }> | null;
  popularBrands: Array<{
    imageUrl: string;
    id: string;
    link: string;
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
  categories: null | Array<{
    icon: string;
    label: string;
    id: string;
  }>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
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
  phone: string;
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
  tags: string[];
  createdAt: Timestamp;
  phoneNumber: string;
  whatsappNumber: string;
  storeIcon: string;
  storeImages: string[];
  userId: string;
  info1: string;
  info2: string;
  published: boolean;
  schedulArr: Array<{ day: string; time: TimeValue; closed: boolean }>;
  fasebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
  tiktok: string;
  website: string;
  rating: number;
  reviewCount: number;
  category: string;
  visitCount: number;
  verified: boolean;
  // gallery: string[];
  location: string;
  companyProfilePdfUrl: string;
  // youtubeVideos: string[];
  showProfile: boolean;
  haveUpdate: string[];
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
