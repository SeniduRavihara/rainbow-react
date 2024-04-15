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
    <div className="w-full flex justify-center items-center gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={handleGoogleSignin}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={handleFacebookSignin}
      >
        <FaFacebook className="h-5 w-5" />
      </Button>
    </div>
  );
};
export default Social;
