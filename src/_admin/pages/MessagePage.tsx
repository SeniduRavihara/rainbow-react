import { useState } from "react";

const Message = () => {
  const [messageFor, setMessageFor] = useState("all");
  const [email, setEmail] = useState("");


  return (
    <div className="w-full min-h-screen">
      <h1 className="text-3xl font-bold text-blue-500 text-center m-2">
        ALL USER MESSAGE REQUESTS
      </h1>

      <div className="max-w-[400px] border p-5 rounded-md flex flex-col gap-2">
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
          ></textarea>
        </div>

        <div className="mb-3">
          <input
            type="submit"
            name=""
            className="w-full bg-blue-500 hover:bg-blue-400 duration-300 text-white px-2 py-1 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};
export default Message;
