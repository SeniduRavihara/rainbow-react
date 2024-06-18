import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import CardWrapper from "../components/CardWrapper";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { loginSchema } from "@/schemas";
import { getUserRole, login, logout } from "@/firebase/api";
import toast from "react-hot-toast";
import { sendEmailVerification } from "firebase/auth";

// import toast from "react-hot-toast";

const LoginForm = () => {
  const navigate = useNavigate();

  // 1. Define your form.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const user = await login(values);
      const roles = await getUserRole(user.uid);

      if (!user.emailVerified) {
        await logout();
        form.reset();
        toast.error("Verify Your email to login");
        await sendEmailVerification(user);
        toast.success(
          " A verification link has been sent to your email address."
        );
        return;
      }

      if (roles && roles.includes("admin")) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   try {
  //     const uid = await login({ email, password });
  //     const roles = await getUserRole(uid);
  //     console.log(roles);

  //     if (roles && roles.includes("admin")) {
  //       navigate("/admin");
  //     } else {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <CardWrapper
      backButtonLabel="Don't have an account?"
      backButtonHref="/signup"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter email"
                      // disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      // disabled={isPending}
                      placeholder="Enter password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#277aa0] hover:bg-[#277aa0]/90"
          >
            Login
          </Button>

          <Button
            variant="link"
            type="button"
            className="font-normal w-full"
            size="sm"
            asChild
          >
            <Link to="/reset-password">Forgot Password?</Link>
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
