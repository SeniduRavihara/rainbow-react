import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider, storage } from "./config";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  startAfter,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { CurrentUserDataType, StoreListType, StoreObj } from "@/types";

// --------------------------------------
export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ---------------------------------------
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
    // console.log(userCredential);

    return userCredential.user.uid;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// -------------------------------------
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
    // console.log(userCredential);
    const user = userCredential.user;

    const payload = {
      name,
      id: user.uid,
      email,
      roles: ["user"],
      haveStore: false,
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

// -------------------------------------
export const googleSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, provider);
    // console.log(userCredential);

    const user = userCredential.user;
    const userDocRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      const payload = {
        name: user.displayName,
        id: user.uid,
        email: user.email,
        roles: ["user"],
        haveStore: false,
      };

      await setDoc(userDocRef, payload);

      return userCredential.user.uid;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// ----------------------------------------------
export const getUserRole = async (uid: string) => {
  const documentRef = doc(db, "users", uid);
  const userData = await getDoc(documentRef);

  // Use nullish coalescing to provide a default value if userData is undefined
  return userData?.data()?.roles ?? null;
};

// ----------------------------------------------
export const createStore = async (uid: string, payload: any) => {
  // console.log("PAYLOAD", payload);

  try {
    await setDoc(doc(db, "store", uid), {
      ...payload,
      userId: uid,
      active: false,
      createdAt: new Date(),
      published: false,
    });
    console.log("Document successfully written to Firestore!");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// -------------------------------------------
export const updateStore = async (uid: string, payload: any) => {
  // console.log(payload);

  try {
    await updateDoc(doc(db, "store", uid), {
      ...payload,
    });
    console.log("Document Update successfully");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// -------------------------------------------
export const updateProfileForHaveStore = async (
  uid: string,
  haveStore: boolean
) => {
  try {
    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, {
      haveStore,
    });
  } catch (error) {
    console.log(error);
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

// ---------------------------------------
export const uploadAdd = async (
  file: File | Blob,
  path: string,
  id: string
) => {
  try {
    const fileRef = ref(storage, `/${path}/${id}`);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    console.log("Add Image uploaded successfully!");

    return photoURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Failed to upload profile picture");
  }
};

// ----------------------------------------------
export const fetchData = async ({
  setLoadingStoreFetching,
  lastDocument,
  setLastDocument,
  setSearchResultStores,
  setIsAllFetched,
}: {
  setLoadingStoreFetching: React.Dispatch<React.SetStateAction<boolean>>;
  lastDocument: StoreObj | null;
  setLastDocument: React.Dispatch<React.SetStateAction<StoreObj | null>>;
  setSearchResultStores: React.Dispatch<
    React.SetStateAction<StoreListType | null>
  >;
  setIsAllFetched: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  setLoadingStoreFetching(true);

  const collectionRef = collection(db, "store");
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    startAfter(lastDocument?.createdAt ?? ""),
    limit(3),
    where("active", "==", true),
    where("published", "==", true)
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
    setIsAllFetched(true);
    console.log("All Store are Fetched!");
  }

  setLoadingStoreFetching(false);
};

// export const getCurrentUsersStore = async (uid: string) => {
//   const documentRef = doc(db, "store", uid);

//   try {
//     const storeData = await getDoc(documentRef);

//     return storeData?.data() as StoreObj;
//   } catch (error) {
//     console.error("Error retrieving store data:", error);
//     return null;
//   }
// };

//--------------------------------------------------
export const togglePublish = async (uid: string, published: boolean) => {
  try {
    const documentRef = doc(db, "store", uid);
    await updateDoc(documentRef, {
      published: !published,
    });
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------

export const createMessageToAll = async (message: string) => {
  const collectionRef = collection(db, "messagesToAll");

  try {
    await addDoc(collectionRef, { message, createdAt: new Date() });
    console.log("New Message added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMessageToUser = async (message: string, email: string) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("email", "==", email));

  const queryStoresSnapshot = await getDocs(q);

  const matchingUser = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))[0] as CurrentUserDataType;

  const userIdForSetMessage = matchingUser?.id;

  if (!userIdForSetMessage) return;

  const userMessagesRef = collection(
    db,
    "users",
    userIdForSetMessage,
    "messages"
  );

  try {
    await addDoc(userMessagesRef, { message, createdAt: new Date() });
    console.log("New Message added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ------------------------------------

export const handleMessageDelete = async (id: string) => {
  try {
    const documentRef = doc(db, "messagesToAll", id);
    await deleteDoc(documentRef);
    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};
