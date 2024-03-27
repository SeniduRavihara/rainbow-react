import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db, provider, storage } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

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
  gender,
  profileImage,
}: {
  email: string;
  password: string;
  name: string;
  gender: string;
  profileImage: File | null;
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
      gender,
    };

    await setDoc(doc(db, "users", user.uid), payload);

    if (profileImage) {
      const profilePicUrl = await uploadProfilePic(profileImage, user.uid);
      updateProfile(user, { photoURL: profilePicUrl });
    }

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
    });
    console.log("Document successfully written to Firestore!");
  } catch (error) {
    console.error("Error writing document:", error);
  }
};

const uploadProfilePic = async (file: File, uid: string) => {
  try {
    const fileRef = ref(storage, `/user_profile_images/${uid}`);
    await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    console.log("Profile Piucture uploaded successfully!", photoURL);

    return photoURL;
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    throw new Error("Failed to upload profile picture");
  }
};
