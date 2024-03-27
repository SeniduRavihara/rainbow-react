// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { loginSchema } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import CardWrapper from "../components/CardWrapper";
// import { getUserRole, login } from "@/firebase/api";
// import { useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { loginSchema } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import CardWrapper from "../components/CardWrapper";
// import { getUserRole, login } from "@/firebase/api";
// import { useNavigate } from "react-router-dom";

// import { useForm } from "react-hook-form";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

// import { loginSchema } from "@/schemas";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import CardWrapper from "../components/CardWrapper";
// import { getUserRole, login } from "@/firebase/api";
// import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

const LoginForm = () => {
  // const navigate = useNavigate();

  // // 1. Define your form.
  // const form = useForm<z.infer<typeof loginSchema>>({
  //   resolver: zodResolver(loginSchema),
  //   defaultValues: {
  //     email: "",
  //     password: "",
  //   },
  // });

  // // 2. Define a submit handler.
  // async function onSubmit(values: z.infer<typeof loginSchema>) {
  //   try {
  //     const uid = await login(values);
  //     const roles = await getUserRole(uid);

  //     if (roles.includes("admin")) {
  //       console.log("ADMIN");

  //       navigate("/admin");
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <div className="register login">
      <div className="container">
        <div className="card w-[400px] p-4 border border-primary">
          <div className="text-4xl mb-10 font-bold text-blue-500">Login</div>
          <div className="row">
            <div className="col-12">
              <form action="" id="login-form">
                <div className="user-details">
                  <div className="row mb-3">
                    <div className="group col-12">
                      <input
                        type="email"
                        className="form-control shadow-sm"
                        placeholder="Enter your email"
                        name="email"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="group col-12">
                      <input
                        type="password"
                        className="form-control shadow-sm"
                        placeholder="Enter your password"
                        name="password"
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
                    <button
                      className="btn btn-primary btn-lg loginbtn w-1/2"
                     
                    >
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
