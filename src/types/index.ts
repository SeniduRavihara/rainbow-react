import { User } from "firebase/auth";
import React from "react";

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
} | null;

export type StoreListType = Array<{
  id: string;
  title: string;
  active: boolean;
  address: string;
  email: string;
  messages: string[];
  tags: string[];
}>;

export type StoreListDocType = {
  title: string;
  active: boolean;
  address: string;
  email: string;
  messages: string[];
  tags: string[];
};
