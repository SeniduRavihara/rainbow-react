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
import AdminPage from "./_private/pages/AdminPage";
import PrivateLayout from "./_private/PrivateLayout";
import DataContextProvider from "./context/DataContext";
import { ChakraProvider } from "@chakra-ui/react";
import CreateStorePage from "./_private/pages/CreateStorePage";
import AdminLayout from "./_admin/AdminLayout";


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
      </Route>

      {/* private routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/create-store" element={<CreateStorePage />} />
      </Route>

      {/* admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage />} />
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
        </AuthContextProvider>
      </DataContextProvider>
    </ChakraProvider>
  );
};
export default App;
