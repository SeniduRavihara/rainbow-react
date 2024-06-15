import {
  createMessageToAll,
  createMessageToUser,
  handleMessageDelete,
} from "@/firebase/api";
import { db } from "@/firebase/config";
import { getTimeDifference } from "@/lib/utils";
import { messageObjType } from "@/types";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

const Message = () => {
  const [messageFor, setMessageFor] = useState("all");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [messagesToAll, setMessagesToAll] =
    useState<Array<messageObjType> | null>(null);

  const handleSubmit = async () => {
    try {
      if (messageFor === "all") {
        await createMessageToAll(message);
        setMessage("");
      } else {
        await createMessageToUser(message, email);
        setMessage("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, "adminMessages");
      const q = query(collectionRef, orderBy("createdAt", "desc"));

      const unsubscribe = onSnapshot(q, async (QuerySnapshot) => {
        const messageArr = QuerySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Array<messageObjType>;

        setMessagesToAll(messageArr);
        // console.log(messageArr);
      });

      return unsubscribe;
    };

    fetchData();
  }, []);

  return (
    <div className="w-full pb-5 pt-3 px-10">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-3xl font-bold text-blue-500 text-center m-2">
          USER MESSAGE REQUESTS
        </h1>

        <div className="w-[400px] border p-5 rounded-md flex flex-col gap-2 mt-3">
          <h2 className="text-xl font-medium text-blue-500 text-center ">
            Create Message
          </h2>

          <select
            className="form-select shadow-none"
            name="selectaction"
            id="messageSelect"
            value={messageFor}
            onChange={(e) => setMessageFor(e.target.value)}
          >
            <option selected value="all">
              All users
            </option>
            <option value="custom">Custom User</option>
          </select>

          {messageFor === "custom" && (
            <div className="mb-3" id="inputEmail">
              <input
                type="email"
                className="form-control shadow-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="User email"
              />
            </div>
          )}

          <div className="mb-3">
            <textarea
              className="form-control shadow-none"
              name="mscontent"
              required
              placeholder="Message"
              id="mesacontent"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="mb-3">
            <input
              type="submit"
              onClick={handleSubmit}
              name=""
              className="w-full bg-blue-500 hover:bg-blue-400 duration-300 text-white px-2 py-1 rounded-md"
            />
          </div>
        </div>
      </div>

      <ul className="flex flex-col mt-10 font-medium items-center justify-center">
        {messagesToAll &&
          messagesToAll.map((messageObj, index) => (
            <li
              className="w-full flex items-center justify-between border-b py-2 px-4"
              key={index}
            >
              <div>
                {messageObj.message}
                <div className="text-sm">
                  {getTimeDifference(messageObj.createdAt.toDate())} ago
                </div>
              </div>
              <RxCross1
                className="cursor-pointer"
                onClick={() => {
                  // console.log(messageObj);

                  handleMessageDelete(messageObj.toId, messageObj.id);
                }}
              />
            </li>
          ))}
      </ul>
    </div>
  );
};
export default Message;
