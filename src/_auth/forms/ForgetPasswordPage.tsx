import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";

import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

import { Link } from "react-router-dom";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email){
      toast.error("Please Eter Your Email")
      return
    }
      try {
        await sendPasswordResetEmail(auth, email);
        toast.success("Check In your Email");
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div>
      <Card className="w-[400px] shadow-md">
        <CardHeader className="text-center">
          <Header label="" />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center justify-center"
          >
            <div className="w-full">
              <Label>Enter Your email</Label>
              <Input
                type="text"
                className="w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <Button className="mx-auto">Reset</Button>
          </form>
        </CardContent>

        <Button
          variant="link"
          className="font-normal w-full mb-5"
          size="sm"
          asChild
        >
          <Link to="/">Back To Home</Link>
        </Button>
      </Card>
    </div>
  );
};
export default ForgetPasswordPage;
