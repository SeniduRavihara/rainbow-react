import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, fbProvider, provider, storage } from "./config";
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
import toast from "react-hot-toast";
import { v4 } from "uuid";

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

    return userCredential.user;
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
    await sendEmailVerification(user);
    toast.success(
      "Success! A verification link has been sent to your email address."
    );

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

    return userCredential.user;
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

export const facebookSignIn = async () => {
  try {
    const userCredential = await signInWithPopup(auth, fbProvider);
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

// =============================================

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
    const storeId = `${uid}--${v4().replace(/-/g, "")}`;

    await setDoc(doc(db, "store", storeId), {
      ...payload,
      userId: uid,
      id: storeId,
      active: false,
      createdAt: new Date(),
      published: false,
      reviewCount: 0,
      rating: 0,
      visitCount: 0,
      verified: false,
      showProfile: false,
      haveUpdate: [],
      location: "",
      companyProfilePdfUrl: "",
    });

    for (let index = 0; index < 4; index++) {
      console.log("payload");
      try {
        const { id } = await addDoc(
          collection(db, "store", storeId, "top-slider"),
          {
            imageUrl: "",
          }
        );

        await setDoc(doc(db, "latestStore", storeId, "top-slider", id), {
          imageUrl: "",
        });
      } catch (error) {
        console.log(error);
      }
    }

    console.log("Document successfully written to Firestore!");

    return storeId;
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// -------------------------------------------
export const updateStore = async (storeId: string, payload: any) => {
  // console.log(payload);

  try {
    await updateDoc(doc(db, "store", storeId), {
      ...payload,
    });

    const collectionRef = collection(db, "store", storeId, "top-slider");
    const querySnapshot = await getDocs(collectionRef);
    const documentsExist = !querySnapshot.empty;

    if (!documentsExist) {
      for (let index = 0; index < 4; index++) {
        console.log("payload");
        try {
          await addDoc(collection(db, "store", storeId, "top-slider"), {
            imageUrl: "",
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    const documentRef = doc(db, "store", storeId);
    await updateDoc(documentRef, {
      active: false,
    });

    console.log("Document Update successfully");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// ------------------------------------------------------

export const updateStore2 = async (storeId: string, payload: any) => {
  // console.log(payload);

  try {
    await updateDoc(doc(db, "store", storeId), {
      ...payload,
    });

    console.log("Document Update successfully");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// ---------------------------------------------

export const updateStore3 = async (storeId: string, payload: any) => {
  // console.log(payload);

  try {
    await updateDoc(doc(db, "latestStore", storeId), {
      ...payload,
    });

    // const collectionRef = collection(db, "store", storeId, "top-slider");
    // const querySnapshot = await getDocs(collectionRef);
    // const documentsExist = !querySnapshot.empty;

    // if (!documentsExist) {
    //   for (let index = 0; index < 4; index++) {
    //     console.log("payload");
    //     try {
    //       await addDoc(collection(db, "latestStore", storeId, "top-slider"), {
    //         imageUrl: "",
    //       });
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    // }

    console.log("Document Update successfully");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

// --------------------------------------------
export const syncLatestStoreWithStore = async (storeId: string) => {
  // console.log(payload);

  try {
    const documentRef = doc(db, "store", storeId);
    const querySnapshot = await getDoc(documentRef);

    const latestDocumentRef = doc(db, "latestStore", storeId);
    await updateDoc(latestDocumentRef, { ...querySnapshot.data() });
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
    const fileRef = ref(storage, `advertise/${path}/${id}`);
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
    limit(8),
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

// ---------------------------------------------

export const fetchCatogaryData = async (
  {
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
  },
  label: string
) => {
  setLoadingStoreFetching(true);

  const collectionRef = collection(db, "store");
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    startAfter(lastDocument?.createdAt ?? ""),
    limit(8),
    where("active", "==", true),
    where("published", "==", true),
    // where("categoriesArr", "array-contains", label),
    where("category", "==", label)
  );

  const queryStoresSnapshot = await getDocs(q);

  const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as StoreListType;

  setLastDocument(storeListArr[storeListArr.length - 1]);
  console.log(label,storeListArr);

  if (storeListArr.length > 0) {
    setSearchResultStores(null);
    setLastDocument(null);
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

// --------------------------------------------

export const fetchTagData = async (
  {
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
  },
  tag: string
) => {
  setLoadingStoreFetching(true);

  const collectionRef = collection(db, "store");
  const q = query(
    collectionRef,
    orderBy("createdAt", "desc"),
    startAfter(lastDocument?.createdAt ?? ""),
    limit(8),
    where("active", "==", true),
    where("published", "==", true),
    where("tags", "array-contains", tag)
  );

  const queryStoresSnapshot = await getDocs(q);

  const storeListArr = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as StoreListType;

  setLastDocument(storeListArr[storeListArr.length - 1]);
  // console.log(storeListArr);

  if (storeListArr.length > 0) {
    setSearchResultStores(null);
    setLastDocument(null);
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

// --------------------------------------------

export const fetchStoreById = async (id: string) => {
  const documentRef = doc(db, "store", id);

  try {
    const storeData = await getDoc(documentRef);
    return storeData?.data() as StoreObj;
  } catch (error) {
    console.log(error);
  }
};

export const fetchStoreByName = async (storeName: string) => {
  const collectionRef = collection(db, "store");
  const q = query(collectionRef, where("title", "==", storeName));

  try {
    const queryStoresSnapshot = await getDocs(q);
    if (queryStoresSnapshot.empty) {
      console.log("No matching store found");
      return null;
    }

    const matchingStoreDoc = queryStoresSnapshot.docs[0];
    const matchingStoreData = matchingStoreDoc.data();
    const matchingStoreId = matchingStoreDoc.id;

    return { matchingStoreId, matchingStoreData };
  } catch (error) {
    console.log("Error fetching store by name:", error);
    return null;
  }
};
// ---------------------------------------------
export const checkIsStoreNameAvailable = async (storeName: string) => {
  const collectionRef = collection(db, "store");
  const q = query(collectionRef, where("title", "==", storeName));

  try {
    const queryStoresSnapshot = await getDocs(q);
    if (queryStoresSnapshot.empty) {
      console.log("store available");
      return true;
    }

    return false;
  } catch (error) {
    console.log("Error fetching store by name:", error);
    return false;
  }
};
// --------------------------------------------

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
export const togglePublish = async (storeId: string, published: boolean) => {
  try {
    const documentRef = doc(db, "store", storeId);
    await updateDoc(documentRef, {
      published: !published,
    });
    // syncLatestStoreWithStore(storeId);
    try {
      const documentRef = doc(db, "store", storeId);
      const querySnapshot = await getDoc(documentRef);

      // const storeData = querySnapshot.data() as StoreObj

      const latestDocumentRef = doc(db, "latestStore", storeId);
      await updateDoc(latestDocumentRef, {
        published: querySnapshot.data()?.published,
      });
    } catch (error) {
      console.error("Error writing document:", error);
    }
  } catch (error) {
    console.log(error);
  }
};

// ---------------------------------------------

// export const createMessageToAll = async (message: string) => {
//   const collectionRef = collection(db, "messagesToAll");

//   try {
//     await addDoc(collectionRef, { message, createdAt: new Date() });
//     console.log("New Message added..");
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

export const createMessageToAll = async (message: string) => {
  try {
    const collectionRef = collection(db, "users");
    const querySnapshot = await getDocs(collectionRef);

    const adminMessagesCollectionRef = collection(db, "adminMessages");
    const { id: adminMessageId } = await addDoc(adminMessagesCollectionRef, {
      message,
      createdAt: new Date(),
      imageUrl: "",
      fromName: "admin",
      fromId: "",
      toName: "all",
      toId: "",
      seen: false,
    });

    // Create an array of promises for adding messages to each user
    const addMessagePromises = querySnapshot.docs.map(async (doc) => {
      const userMessagesRef = collection(doc.ref, "messages");
      await addDoc(userMessagesRef, {
        message,
        messageId: adminMessageId,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "admin",
        fromId: "",
        toName: "all",
        toId: "",
        seen: false,
      });
    });

    // Wait for all messages to be added to users
    await Promise.all(addMessagePromises);

    console.log("Message sent to all users successfully.");
  } catch (error) {
    console.log("Error sending message to all users:", error);
    throw error;
  }
};

// -------------------------------------------------------

export const createMessageToUser = async (message: string, email: string) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("email", "==", email));

  const queryStoresSnapshot = await getDocs(q);

  const matchingUser = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))[0] as CurrentUserDataType;

  const userIdForSetMessage = matchingUser?.id;

  if (!userIdForSetMessage) return "There are no matching user";

  // const userMessagesRef = collection(
  //   db,
  //   "users",
  //   userIdForSetMessage,
  //   "messages"
  // );

  try {
    const adminMessagesCollectionRef = collection(db, "adminMessages");
    const { id: adminMessageId } = await addDoc(adminMessagesCollectionRef, {
      message,
      createdAt: new Date(),
      imageUrl: "",
      fromName: "admin",
      fromId: "",
      toName: email,
      toId: matchingUser.id,
      seen: false,
    });

    console.log(adminMessageId);

    await setDoc(
      doc(db, "users", userIdForSetMessage, "messages", adminMessageId),
      {
        message,
        messageId: adminMessageId,
        createdAt: new Date(),
        imageUrl: "",
        fromName: "admin",
        fromId: "",
        toName: matchingUser.id,
        toId: userIdForSetMessage,
        seen: false,
      }
    );
    console.log("New Message added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ------------------------------------

export const updateAsSeen = async (uid: string) => {
  try {
    const collectionRef = collection(db, "users", uid, "messages");

    const querySnapshot = await getDocs(collectionRef);

    querySnapshot.docs.forEach((doc) => {
      const messageRef = doc.ref;
      updateDoc(messageRef, { seen: true });
    });

    // for(const i=0; i<=querySnapshot)
  } catch (error) {
    console.log(error);
  }
};

// ------------------------------------

export const handleMessageDelete = async (
  userId: string,
  messageId: string
) => {
  if (!userId && !messageId) return;
  try {
    const documentRef1 = doc(db, "adminMessages", messageId);
    await deleteDoc(documentRef1);

    const documentRef = doc(db, "users", userId, "messages", messageId);
    await deleteDoc(documentRef);
    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

// ------------------------------------

export const handleUserMessageDelete = async (uid: string, id: string) => {
  try {
    const documentRef = doc(db, "users", uid, "messages", id);
    await deleteDoc(documentRef);
    console.log("Message deleted successfully");
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

// ---------------------------------

export const postReview = async (
  payload: {
    imageUrl: string;
    userName: string;
    userId: string;
    review: string;
    rating: number;
  },
  selectedStoreId: string
) => {
  const collectionRef = collection(db, "store", selectedStoreId, "reviews");

  try {
    await addDoc(collectionRef, {
      createdAt: new Date(),
      ...payload,
    });
    console.log("New review added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updteReview = async (
  payload: {
    imageUrl: string;
    userName: string;
    userId: string;
    review: string;
    rating: number;
  },
  selectedStoreId: string,
  reviewId: string
) => {
  const collectionRef = doc(db, "store", selectedStoreId, "reviews", reviewId);

  try {
    await setDoc(collectionRef, {
      createdAt: new Date(),
      ...payload,
    });
    console.log("New review added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// --------------------------------

export const addLocation = async (
  locations: string[],
  preLocationArr: string[]
) => {
  const collectionRef = collection(db, "locations");

  try {
    for (const location of locations) {
      if (!preLocationArr.includes(location)) {
        await addDoc(collectionRef, {
          location,
        });
      }
    }

    console.log("New Location added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ----------------------------

export const postEnquery = async (
  payload: {
    imageUrl: string;
    fromName: string;
    fromId: string;
    message: string;
    email: string;
    phone: string;
  },
  selectedStoreId: string
) => {
  const collectionRef = collection(db, "users", selectedStoreId, "messages");

  try {
    await addDoc(collectionRef, {
      createdAt: new Date(),
      ...payload,
    });
    console.log("New Message added..");
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// ------------------------------------

export const getIdFromEmail = async (email: string) => {
  const collectionRef = collection(db, "users");
  const q = query(collectionRef, where("email", "==", email));

  const queryStoresSnapshot = await getDocs(q);

  const matchingUser = queryStoresSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }))[0] as CurrentUserDataType | undefined; // Change the type here

  if (!matchingUser) return null; // Return null if there are no matching users

  return matchingUser;
};

// ---------------------------------------

export const removeAsAdmin = async (uid: string, roles: string[]) => {
  try {
    // Remove "admin" role from the roles array
    const updatedRoles = roles.filter((role) => role !== "admin");

    // Update the document in Firestore
    const documentRef = doc(db, "users", uid);
    await updateDoc(documentRef, {
      roles: updatedRoles,
    });
  } catch (error) {
    console.log(error);
  }
};

// -----------------------------------------

export const createCategory = async ({
  label,
  icon,
}: {
  label: string;
  icon: string;
}) => {
  const documentRef = doc(db, "categories", label);
  await setDoc(documentRef, { label, icon });
};
