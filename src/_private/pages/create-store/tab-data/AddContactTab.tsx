import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/firebase/config";
import { CircularProgress, Select } from "@chakra-ui/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";

const AddContactTab = ({ storeId }: { storeId: string }) => {
  const [contactMethod, setContactMethod] = useState("phone");
  const [contact, setContact] = useState("");
  const [contactList, setContactList] = useState<
    Array<{ type: string; contact: string; id: string }>
  >([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (storeId) {
      const collectionRef = collection(db, "latestStore", storeId, "contacts");
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
        setContactList(contactstListArr);
      });

      return unsubscribe;
    }
  }, [storeId]);

  const handleClickAdd = async () => {
    if (!contactMethod || !contact) return;
    setLoading(true);

    try {
      const collectionRef = collection(db, "latestStore", storeId, "contacts");
      await addDoc(collectionRef, {
        type: contactMethod,
        contact,
      });

      const documentRef = doc(db, "latestStore", storeId);
      const latestData = await getDoc(documentRef);

      await updateDoc(documentRef, {
        haveUpdate: [
          ...(latestData?.data()?.haveUpdate ?? []),
          latestData?.data()?.haveUpdate.includes("contacts")
            ? undefined
            : "contacts",
        ].filter((txt) => txt),
      });

      toast.success("Contact successfully added!");
      setContact("");
      setContactMethod("phone");
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleClickRemoveContact = async (id: string) => {
    try {
      const documentRef = doc(db, "latestStore", storeId, "contacts", id);
      await deleteDoc(documentRef);

       const latestDocumentRef = doc(db, "latestStore", storeId);
       const latestData = await getDoc(latestDocumentRef);

       await updateDoc(latestDocumentRef, {
         haveUpdate: [
           ...(latestData?.data()?.haveUpdate ?? []),
           latestData?.data()?.haveUpdate.includes("contacts")
             ? undefined
             : "contacts",
         ].filter((txt) => txt),
       });

      toast.success("Contact successfully deleted!");
    } catch (error) {
      console.log(error);
    }
  };

  function capitalizeFirstLetter(str: string) {
    if (!str) return ""; // Return empty string if input is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Select
          width={150}
          value={contactMethod}
          onChange={(e) => setContactMethod(e.target.value)}
        >
          <option value="phone">Phone</option>
          <option value="email">Email</option>
          <option value="land">Land</option>
          <option value="fax">Fax</option>
          <option value="viber">Viber</option>
          <option value="address">Adress</option>
        </Select>

        <Input
          type="email"
          className=""
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder={capitalizeFirstLetter(contactMethod)}
        />
        <Button onClick={handleClickAdd}>Add</Button>
      </div>

      {loading ? (
        <CircularProgress size="30px" isIndeterminate color="green.300" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Type</th>
              <th>Contact</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {contactList?.map(
              (contactObj, index) =>
                contactObj && (
                  <tr key={index}>
                    <td>{contactObj.type}</td>
                    <td>{contactObj.contact}</td>
                    <td className="text-right">
                      <Button
                        onClick={() => handleClickRemoveContact(contactObj.id)}
                      >
                        <RxCross2 />
                      </Button>
                    </td>
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default AddContactTab;
