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
import CreateStorePage from "./_private/pages/create-store/CreateStorePage";
import AdminLayout from "./_admin/AdminLayout";
import { Toaster } from "react-hot-toast";
// import StoreProfilePage from "./_private/pages/StoreProfilePage";
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
import CommentsPage from "./_admin/pages/CommentsPage";
import StoreDetailsPage from "./_public/pages/StoreDetailsPage";
import ManageStorePage from "./_private/pages/ManageStorePage";
import DetailsPageAddsManage from "./components/admin/DetailsPageAddsManage";
import AllCategoryPage from "./_public/pages/AllCategoryPage";
// import ManageStore from "./_private/pages/manage-store/ManageStore";
import ManagmentPage from "./_admin/pages/ManagmentPage";
import ManageStoresPage from "./_private/pages/manage-stores/ManageStoresPage";

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
        <Route
          path="/search-results/:category"
          element={<SearchResultsPage />}
        />
        <Route path="/all-catogaries" element={<AllCategoryPage />} />
        <Route path="/store-details/:storeId" element={<StoreDetailsPage />} />
      </Route>

      {/* private routes */}
      <Route element={<PrivateLayout />}>
        <Route path="/create-store" element={<CreateStorePage />} />
        <Route path="/manage-store/:storeId" element={<ManageStorePage />} />
        <Route path="/manage-stores" element={<ManageStoresPage />} />
      </Route>

      {/* admin routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminPage2 />}>
          <Route path="message" element={<MessagePage />} />
          <Route path="business" element={<StorePage />} />
          <Route path="" element={<SetAddsPage />}>
            <Route path="popular-brands" element={<PopularBrandsManage />} />
            <Route
              path="search-result-adds"
              element={<SearchResultAddsManage />}
            />
            <Route path="slider-adds" element={<SliderAddsManage />} />
            <Route path="section-adds" element={<SectionAddsManage />} />
            <Route
              path="details-page-adds"
              element={<DetailsPageAddsManage />}
            />
          </Route>
          <Route index element={<AnalyticsPage />} />
          <Route path="comments" element={<CommentsPage />} />
          <Route path="manage" element={<ManagmentPage />} />
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
