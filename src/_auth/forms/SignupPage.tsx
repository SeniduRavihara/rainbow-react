import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import { getUserRole, signup } from "@/firebase/api";
import Loader from "@/components/Loader";

const RegisterForm = () => {
  const submitButtonRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("Male");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (password === confirmPassword) {
      try {
        const uid = await signup({
          name,
          email,
          password,
          gender,
          profileImage,
        });
        const roles = await getUserRole(uid);
        if (roles.includes("admin")) {
          navigate("/admin");
        }
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleClickRegister = async () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.click();
    }
  };

  return (
    <div className="register">
      <div className="container">
        <div className="card content p-4 border border-primary">
          <div className="title text-primary">Account Infromation</div>
          <div className="row">
            <div className="col-12">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="logo" style={{ display: "flex" }}>
                  <label
                    className="photo-add-button cursor-pointer"
                    id="logo-button"
                    htmlFor="profile-image"
                  >
                    {profileImage? (
                      <img
                        src={URL.createObjectURL(profileImage)}
                        alt="profile"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <IonIcon icon={addOutline}></IonIcon>
                    )}
                    {/* <IonIcon icon={addOutline}></IonIcon> */}
                  </label>
                  <div id="previewImagelogo"></div>
                </div>

                <div>
                  <div>
                    <Link
                      to="/login"
                      className="btn btn-primary btn-lg loginbtn"
                    >
                      Login
                    </Link>
                  </div>
                  <div>
                    <button
                      className="btn btn-primary btn-lg loginbtn"
                      id="register-btn"
                      onClick={handleClickRegister}
                    >
                      {loading ? (
                        <>
                          <Loader /> Loading...
                        </>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit} id="register-form">
                <div className="user-details">
                  <div className="row mb-3">
                    <div className="group col-6">
                      <input
                        type="file"
                        name="profile_picture"
                        required
                        hidden
                        onChange={(e) => {
                          if (e.target.files) {
                            setProfileImage(e.target.files[0]);
                          }
                        }}
                        id="profile-image"
                      />
                      <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Enter your name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="group col-6">
                      <select
                        name="gender"
                        required
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="group col-6">
                      <input
                        type="password"
                        className="form-control shadow-sm"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="group col-6">
                      <input
                        type="password"
                        className="form-control shadow-sm"
                        required
                        placeholder="Enter  confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="group col-12">
                      <input
                        type="email"
                        className="form-control shadow-sm"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <input
                    type="submit"
                    hidden
                    id="subbtn"
                    ref={submitButtonRef}
                    disabled={loading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
