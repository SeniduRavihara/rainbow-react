import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/config";
import { confirmPasswordReset } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      //   toast.error("Please Eter Your Email");
      return;
    }

    if (resetCode) {
      try {
        await confirmPasswordReset(auth, resetCode, password);
        toast.success(
          "Your password has been reset. Please log in with your new password."
        );
        setPassword("");
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Card className="xsm:w-[400px] w-[350px] shadow-md backdrop-blur-xl bg-white/60">
        <CardHeader className="text-center">
          <Header label="Reset Your Password" />
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 items-center justify-center"
          >
            <div className="w-full">
              <Label>Enter Your New Password</Label>
              <Input
                type="password"
                className="w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <Button className="mx-auto bg-[#277aa0] hover:bg-[#277aa0]/90">
              Reset
            </Button>
          </form>
        </CardContent>

        <Button
          variant="link"
          className="font-normal w-full mb-5"
          size="sm"
          asChild
        >
          <Link to="/login">Back to login</Link>
        </Button>
      </Card>
    </div>
  );
};
export default PasswordResetPage;
