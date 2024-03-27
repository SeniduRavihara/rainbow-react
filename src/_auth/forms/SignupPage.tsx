// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import CardWrapper from "../components/CardWrapper";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { registerSchema } from "@/schemas";
// import { getUserRole, signup } from "@/firebase/api";
// import { useNavigate } from "react-router-dom";

// // import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import CardWrapper from "../components/CardWrapper";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { registerSchema } from "@/schemas";
// import { getUserRole, signup } from "@/firebase/api";
// import { useNavigate } from "react-router-dom";
import { IonIcon } from "@ionic/react";
import { addOutline } from "ionicons/icons";
import "./style.css";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  // const navigate = useNavigate();

  // // 1. Define your form.
  // const form = useForm<z.infer<typeof registerSchema>>({
  //   resolver: zodResolver(registerSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //     name: "",
  //   },
  // });

  // // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof registerSchema>) {
  //   try {
  //     const uid = await signup(values);
  //     const roles = await getUserRole(uid);
  //     if (roles.includes("admin")) {
  //       navigate("/admin");
  //     }
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
                    <IonIcon icon={addOutline}></IonIcon>
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
                    >
                      register
                    </button>
                  </div>
                </div>
              </div>

              <form action="" id="register-form">
                <div className="user-details">
                  <div className="row mb-3">
                    <div className="group col-6">
                      <input
                        type="file"
                        name="profile_picture"
                        required
                        hidden
                        id="profile-image"
                      />
                      <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder="Enter your name"
                        required
                        name="name"
                        id="name"
                      />
                    </div>
                    <div className="group col-6">
                      <select name="gender" required id="">
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
                        name="password"
                        id="rpassword"
                      />
                    </div>
                    <div className="group col-6">
                      <input
                        type="password"
                        className="form-control shadow-sm"
                        required
                        placeholder="Enter  confirm password"
                        name="cpassword"
                        id="cpassword"
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
                        name="email"
                        id=""
                      />
                    </div>
                  </div>
                  <input type="submit" hidden id="subbtn" />
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
