import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import SignupPage from "./_auth/forms/SignupPage";
import LoginPage from "./_auth/forms/LoginPage";
import AuthContextProvider from "./context/AuthContext";
import PublicLayout from "./_public/PublicLayout";
import HomePage from "./_public/pages/HomePage";
import AdminPage from "./_admin/pages/AdminPage";
import PrivateLayout from "./_private/PrivateLayout";
import DataContextProvider from "./context/DataContext";
import { ChakraProvider } from "@chakra-ui/react";
import CreateStorePage from "./_private/pages/CreateStorePage";
import AdminLayout from "./_admin/AdminLayout";
// import StoreCard from "./components/StoreCard";
import { Toaster } from "react-hot-toast";
import StoreProfilePage from "./_private/pages/StoreProfilePage";
import Message from "./components/admin/message";
import Store from "./components/admin/store";



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* public routes */}
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        {/* <Route path="/profile" element={<StoreCard />} /> */}
      </Route>

      {/* private routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/store-profile" element={<StoreProfilePage />} />
        <Route path="/create-store" element={<CreateStorePage />} />
      </Route>

      {/* admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />}>
          <Route path="message" element={<Message />} />
          <Route path="store" element={<Store />} />
        </Route>
      </Route>
    </Route>
  )
);

const App = () => {
  return (
    <ChakraProvider>
      <DataContextProvider>
        <AuthContextProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" />
        </AuthContextProvider>
      </DataContextProvider>
    </ChakraProvider>
  );
};
export default App;
