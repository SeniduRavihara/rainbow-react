import { db } from "@/firebase/config";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";import { FaFax } from "react-icons/fa";
import { FaViber } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa6";
import { GiRotaryPhone } from "react-icons/gi";
import { IoLogoWhatsapp } from "react-icons/io";
import { MdWeb } from "react-icons/md";

const ContactTab = ({ storeId }: { storeId: string }) => {
  const [contactList, setContactList] = useState<
    Array<{ type: string; contact: string; id: string }>
  >([]);
  const [availableContactMethods, setAvailableContactMethods] = useState<string[]>([])

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

        console.log(contactstListArr);
        setAvailableContactMethods(contactstListArr.map(contactObj=> contactObj.type));
        setContactList(contactstListArr);
      });

      return unsubscribe;
    }
  }, [storeId]);

  return (
    <div className="flex gap-x-14 gap-y-8 flex-wrap">
      {availableContactMethods.includes("whatsapp") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <IoLogoWhatsapp />
            Whatsapp
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "whatsapp")
              .map((contactObj, index) => (
                <li key={index} className="flex gap-1 items-center">
                  {/* {contactObj.contact} */}
                  <a
                    href={`https://wa.me/${contactObj.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactObj.contact}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("phone") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <FaPhoneAlt />
            Phone
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "phone")
              .map((contactObj, index) => (
                <li key={index} className="flex gap-1 items-center">
                  {/* {contactObj.contact} */}
                  <a href={`tel:${contactObj.contact}`}>{contactObj.contact}</a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("land") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <GiRotaryPhone className="text-xl" />
            Land
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "land")
              .map((contactObj, index) => (
                <li key={index}>
                  {/* {contactObj.contact} */}
                  <a href={`tel:${contactObj.contact}`}>{contactObj.contact}</a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("fax") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <FaFax />
            Fax
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "fax")
              .map((contactObj, index) => (
                <li key={index}>
                  {/* {contactObj.contact} */}
                  <a href={`tel:${contactObj.contact}`}>{contactObj.contact}</a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("viber") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <FaViber />
            Viber
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "viber")
              .map((contactObj, index) => (
                <li key={index}>
                  {/* {contactObj.contact} */}
                  <a
                    href={`viber://chat?number=${contactObj.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactObj.contact}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("email") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <MdEmail />
            Email
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "email")
              .map((contactObj, index) => (
                <li key={index}>
                  {/* {contactObj.contact} */}
                  <a href={`mailto:${contactObj.contact}`}>
                    {contactObj.contact}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("address") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <FaRegAddressCard />
            Address
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "address")
              .map((contactObj, index) => (
                <li key={index}>{contactObj.contact}</li>
              ))}
          </ul>
        </div>
      )}

      {availableContactMethods.includes("website") && (
        <div>
          <h2 className="text-blue-500 font-semibold flex gap-2 items-center mb-2">
            <MdWeb />
            Website
          </h2>
          <ul>
            {contactList
              .filter((contactObj) => contactObj.type === "website")
              .map((contactObj, index) => (
                <li key={index}>
                  {/* {contactObj.contact} */}
                  <a
                    href={`${contactObj.contact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {contactObj.contact}
                  </a>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};
export default ContactTab;
