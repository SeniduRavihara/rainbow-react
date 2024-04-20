import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getIdFromEmail } from "@/firebase/api";
import { db } from "@/firebase/config";
import { CurrentUserDataType } from "@/types";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Select } from "@chakra-ui/react";

const ManagmentPage = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminUsers, setAdminUsers] = useState<CurrentUserDataType[] | null>(
    null
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    const collectionRef = collection(db, "users");
    const q = query(collectionRef, where("roles", "array-contains", "admin"));

    const queryStoresSnapshot = await getDocs(q);
    const currentUserArr = queryStoresSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as CurrentUserDataType[];

    console.log(currentUserArr);

    setAdminUsers(currentUserArr);

    setLoading(false);
  };

  const handleClickAssign = () => {
    if (!role) return;

    const updateRoles = async () => {
      try {
        const matchingUser = await getIdFromEmail(email);

        if (!matchingUser) {
          toast.error("No matching user found for this email");
          return;
        }

        const documentRef = doc(db, "users", matchingUser.id);
        await updateDoc(documentRef, {
          roles: matchingUser.roles.includes(role)
            ? matchingUser.roles
            : [...matchingUser.roles, role],
        });

        setRole("");
      } catch (error) {
        console.log(error);
      }
    };

    updateRoles();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center mb-10">
        Assign Roles To Users
      </h1>

      <div className="flex gap-5 mb-10">
        <Input
          type="email"
          className=""
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="User email"
        />

        <Select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
        </Select>

        <Button onClick={handleClickAssign}>Assign</Button>
      </div>

      {loading ? (
        <>Loading...</>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              {/* <th>Phone</th> */}
            </tr>
          </thead>
          <tbody>
            {adminUsers?.map(
              (useObj, index) =>
                useObj && (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{useObj.email}</td>
                    <td>{useObj.name}</td>
                    {/* <td>{useObj.phone}</td> */}
                  </tr>
                )
            )}
          </tbody>
        </Table>
      )}
    </div>
  );
};
export default ManagmentPage;
