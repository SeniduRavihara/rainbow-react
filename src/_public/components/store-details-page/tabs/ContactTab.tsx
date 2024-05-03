import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

const ContactTab = ({ storeId }: { storeId: string }) => {
  const [contactList, setContactList] = useState<
    Array<{ type: string; contact: string; id: string }>
  >([]);

  useEffect(() => {
    if (storeId) {
      const collectionRef = collection(db, "store", storeId, "contacts");
      const unsubscribe = onSnapshot(collectionRef, (QuerySnapshot) => {
        const contactstListArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Array<{
          type: string;
          id: string;
          contact: string;
        }>;

        // console.log(contactstListArr);
        setContactList(contactstListArr);
      });

      return unsubscribe;
    }
  }, [storeId]);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-blue-500 font-semibold">Phone</h2>
        <ul>
          {contactList
            .filter((contactObj) => contactObj.type === "phone")
            .map((contactObj, index) => (
              <li key={index}>{contactObj.contact}</li>
            ))}
        </ul>
      </div>

      <div>
        <h2 className="text-blue-500 font-semibold">Email</h2>
        <ul>
          {contactList
            .filter((contactObj) => contactObj.type === "email")
            .map((contactObj, index) => (
              <li key={index}>{contactObj.contact}</li>
            ))}
        </ul>
      </div>
    </div>
  );
};
export default ContactTab;
