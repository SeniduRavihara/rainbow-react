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
// import AdminPage from "./_admin/pages/AdminPage";
import PrivateLayout from "./_private/PrivateLayout";
import DataContextProvider from "./context/DataContext";
import { ChakraProvider } from "@chakra-ui/react";
import CreateStorePage from "./_private/pages/CreateStorePage";
import AdminLayout from "./_admin/AdminLayout";
import { Toaster } from "react-hot-toast";
import StoreProfilePage from "./_private/pages/StoreProfilePage";
import MessagePage from "./_admin/pages/MessagePage";
import StorePage from "./_admin/pages/StorePage";
import SearchResultsPage from "./_public/pages/SearchResultsPage";
import AdminPage2 from "./_admin/pages/AdminPage2";
import SetAddsPage from "./_admin/pages/SetAddsPage";
import AnalyticsPage from "./_admin/pages/AnalyticsPage";
import PopularBrandsManage from "./components/admin/PopularBrandsManage";
import SearchResultAddsManage from "./components/admin/SearchResultAddsManage";
import SliderAddsManage from "./components/admin/SliderAddsManage";
import SectionAddsManage from "./components/admin/SectionAddsManage";

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
        <Route path="/search-results" element={<SearchResultsPage />} />
      </Route>

      {/* private routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/store-profile" element={<StoreProfilePage />} />
        <Route path="/create-store" element={<CreateStorePage />} />
      </Route>

      {/* admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage2 />}>
          <Route path="message" element={<MessagePage />} />
          <Route path="stores" element={<StorePage />} />
          <Route path="set-adds" element={<SetAddsPage />}>
            <Route path="popular-brands" element={<PopularBrandsManage />} />
            <Route
              path="search-result-adds"
              element={<SearchResultAddsManage />}
            />
            <Route path="slider-adds" element={<SliderAddsManage />} />
            <Route path="section-adds" element={<SectionAddsManage />} />
          </Route>
          <Route path="analytics" element={<AnalyticsPage />} />
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
