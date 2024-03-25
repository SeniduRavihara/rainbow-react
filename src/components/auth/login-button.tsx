import { useNavigate } from "react-router-dom";

type LoginButtonProps = {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

function LoginButton({
  children,
  mode = "redirect",
}: LoginButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/auth/login");
    console.log("LOGIN BUTON CLICKED");
  };

  if (mode === "modal") {
    return <span>TODO: Implement modal</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
export default LoginButton;
