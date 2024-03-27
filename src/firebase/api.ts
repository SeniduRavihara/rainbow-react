import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, db, provider } from "./config";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
      name: "",
      id: "",
      email: "",
    };

    await setDoc(doc(db, "users", user.uid), {
      ...payload,
      id: user.uid,
      name,
      email,
      roles: ["user"],
    });

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