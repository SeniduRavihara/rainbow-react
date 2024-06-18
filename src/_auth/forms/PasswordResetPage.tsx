import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase/config";
import {
  applyActionCode,
  confirmPasswordReset,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { Label } from "@/components/ui/label";
import { CircularProgress } from "@chakra-ui/react";

const PasswordResetPage = () => {
  const [password, setPassword] = useState("");
  const [searchParams] = useSearchParams();
  const resetCode = searchParams.get("oobCode");
  const mode = searchParams.get("mode");

  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "verifyEmail") {
      if (resetCode) {
        // Apply the email verification action code
        applyActionCode(auth, resetCode)
          .then(() => {
            // Email verified successfully
            toast.success("Email verified successfully");
            // Redirect to a success page or dashboard
            navigate("/login");
          })
          .catch((error) => {
            if (error.code === "auth/invalid-action-code") {
              toast.error(
                "The verification link has already been used or is expired."
              );
            } else {
              toast.error(
                "An error occurred while verifying your email. Please try again later."
              );
            }
            navigate("/login");
          });
      }
    }
  }, [mode, navigate, resetCode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password) {
      toast.error("Please Enter Your new Password");
      return;
    }

    if (resetCode) {
      try {
        await confirmPasswordReset(auth, resetCode, password);
        verifyBeforeUpdateEmail;
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

  if (mode === "verifyEmail") {
    return <CircularProgress size="60px" isIndeterminate color="green.300" />;
  }

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
