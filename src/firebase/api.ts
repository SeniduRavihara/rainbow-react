import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider, storage } from "./config";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { StoreListType, StoreObj } from "@/types";

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);

    return userCredential.user.uid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signup = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
  gender?: string;
}) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(userCredential);
    const user = userCredential.user;

    const payload = {
      name,
      id: user.uid,
      email,
      roles: ["user"],
    };

    await setDoc(doc(db, "users", user.uid), payload);

    // if (profileImage) {
    //   const profilePicUrl = await uploadProfilePic(profileImage, user.uid);
    //   updateProfile(user, { photoURL: profilePicUrl });
    //   user.reload();
    // }

    return userCredential.user.uid;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const googleSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    console.log(userCredential);

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const userData = {
        name: user.displayName || "",
        email: user.email || "",
        uid: user.uid,
      };

      await setDoc(userDocRef, userData);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserRole = async (uid: string) => {
  const documentRef = doc(db, "users", uid);
  const userData = await getDoc(documentRef);

  // Use nullish coalescing to provide a default value if userData is undefined
  return userData?.data()?.roles ?? null;
};
// const getSectionAdds = async () => {
//   const colletionRef = collection(db, "sectionAdds");
//   const userData = await getDocs(colletionRef);
//   return userData.data().roles;
// };

export const createStore = async (uid: string, payload: any) => {
  console.log(payload);

  try {
    await setDoc(doc(db, "store", uid), {
      ...payload,
      userId: uid,
      active: false,
      createdAt: new Date(),
    });
    console.log("Document successfully written to Firestore!");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// const uploadProfilePic = async (file: File, uid: string) => {
//   try {
//     const fileRef = ref(storage, `/user_profile_images/${uid}`);
//     await uploadBytes(fileRef, file);
//     const photoURL = await getDownloadURL(fileRef);
//     console.log("Profile Piucture uploaded successfully!");

//     return photoURL;
//   } catch (error) {
//     console.error("Error uploading profile picture:", error);
//     throw new Error("Failed to upload profile picture");
//   }
// };

export const uploadAdd = async (file: File | Blob, path: string) => {
  try {
    const fileRef = ref(storage, `/${path}/${v4()}`);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    console.log("Add Image uploaded successfully!");

    return photoURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Failed to upload profile picture");
  }
};

export const fetchData = async ({
  setLoadingStoreFetching,
  lastDocument,
  setLastDocument,
  setSearchResultStores,
}: {
  setLoadingStoreFetching: React.Dispatch<React.SetStateAction<boolean>>;
  lastDocument: StoreObj | null;
  setLastDocument: React.Dispatch<React.SetStateAction<StoreObj | null>>;
  setSearchResultStores: React.Dispatch<
    React.SetStateAction<StoreListType | null>
  >;
}) => {
  setLoadingStoreFetching(true);

  const collectionRef = collection(db, "store");
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    startAfter(lastDocument?.createdAt ?? ""),
    limit(3)
  );

  const queryStoresSnapshot = await getDocs(q);

  const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as StoreListType;

  setLastDocument(storeListArr[storeListArr.length - 1]);
  // console.log(storeListArr);

  if (storeListArr.length > 0) {
    setSearchResultStores((prev) => {
      if (prev && prev[0].id === storeListArr[0].id) return prev;
      return [...(prev || []), ...storeListArr];
    });
  } else {
    console.log("All Store are Fetched!");
  }

  setLoadingStoreFetching(false);
};
