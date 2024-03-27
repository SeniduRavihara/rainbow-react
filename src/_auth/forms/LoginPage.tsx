import { getUserRole, login } from "@/firebase/api";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const uid = await login({ email, password });
      const roles = await getUserRole(uid);
      if (roles.includes("admin")) {
        navigate("/admin");
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register login">
      <div className="container">
        <div className="card w-[400px] p-4 border border-primary">
          <div className="text-4xl mb-10 font-bold text-blue-500">Login</div>
          <div className="row">
            <div className="col-12">
              <form onSubmit={handleSubmit} id="login-form">
                <div className="user-details">
                  <div className="row mb-3">
                    <div className="group col-12">
                      <input
                        type="email"
                        className="form-control shadow-sm"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="group col-12">
                      <input
                        type="password"
                        className="form-control shadow-sm"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-3 gap-2 flex items-center justify-center">
                  <input
                    type="checkbox"
                    name="rem"
                    className="form-check-input shadow-sm"
                  />
                  <label
                    className="form-check-label text-gray-600"
                    htmlFor="exampleCheck1"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <button className="btn btn-primary btn-lg loginbtn w-1/2">
                      Login
                    </button>
                    <Link
                      to="/signup"
                      className="btn btn-primary btn-lg loginbtn w-1/2"
                    >
                      register
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
