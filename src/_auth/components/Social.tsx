import { FcGoogle } from "react-icons/fc";
// import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { facebookSignIn, googleSignIn } from "@/firebase/api";
import { useNavigate } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";

const Social = () => {
  const navigate = useNavigate();

  const handleGoogleSignin = async () => {
    await googleSignIn();
    navigate("/");
  };

  const handleFacebookSignin = async () => {
    await facebookSignIn();
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col gap-4 justify-center items-center gap-x-2 text-muted-foreground">
      <Button
        size="lg"
        className="w-full relative"
        variant="outline"
        onClick={handleGoogleSignin}
      >
        <FcGoogle className="text-2xl absolute left-5 hover:text-muted-foreground" />
        <div>Login with Google</div>
      </Button>
      <Button
        size="lg"
        className="w-full relative bg-indigo-800 text-white hover:bg-indigo-700"
        variant="outline"
        onClick={handleFacebookSignin}
      >
        <FaFacebook className="text-2xl absolute left-5" />
        <div>Login with Facebook</div>
      </Button>
    </div>
  );
};
export default Social;
