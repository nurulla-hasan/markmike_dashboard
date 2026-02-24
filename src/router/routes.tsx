import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/main-layout";
import { lazy } from "react";
import AuthLayout from "@/layout/auth-layout";

// import ProtectedRoute from "@/layout/protected-route";

//======================================================================================================================
// App pages (all under src/app)
const Notifications = lazy(() => import("@/app/notifications/Notifications"));
const Profile = lazy(() => import("@/app/settings/profile/Profile"));
const Privacy = lazy(() => import("@/app/settings/privacy/Privacy"));
const Terms = lazy(() => import("@/app/settings/terms/Terms"));
const About = lazy(() => import("@/app/settings/about-us/About"));
const FAQ = lazy(() => import("@/app/settings/faq/Faq"));

const Dashboard = lazy(() => import("@/app/dashboard/Dashboard"));
const Users = lazy(() => import("@/app/management/users/Users"));
const Orders = lazy(() => import("@/app/management/orders/Orders"));
const StandoutDeals = lazy(() => import("@/app/management/standout-deals/StandoutDeals"));
const AddDeal = lazy(() => import("@/app/management/standout-deals/add-deal/AddDeal"));
const EditDeal = lazy(() => import("@/app/management/standout-deals/edit-deal/EditDeal"));
const Miwahdiss = lazy(() => import("@/app/management/miwahdiss/Miwahdiss"));
const AddEvent = lazy(() => import("@/app/management/miwahdiss/add-event/AddEvent"));
const EditEvent = lazy(() => import("@/app/management/miwahdiss/edit-event/EditEvent"));
const Logo = lazy(() => import("@/app/management/logo/Logo"));
const QuoteRequest = lazy(() => import("@/app/management/quote-request/QuoteRequest"));
const StaffManagements = lazy(() => import("@/app/management/staff-managements/StaffManagements"));
const MakeAdmin = lazy(() => import("@/app/management/make-admin/MakeAdmin"));

const AllProducts = lazy(() => import("@/app/products/all-products/AllProducts"));
const AddProduct = lazy(() => import("@/app/products/add-product/AddProduct"));
const Categories = lazy(() => import("@/app/products/categories/Categories"));
const ProductAttributes = lazy(() => import("@/app/products/product-attributes/ProductAttributes"));

const Login = lazy(() => import("@/app/auth/Login"));
const ForgotPassword = lazy(() => import("@/app/auth/ForgotPassword"));
const ResetPassword = lazy(() => import("@/app/auth/ResetPassword"));
const CodeVerification = lazy(() => import("@/app/auth/CodeVerification"));

//======================================================================================================================

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            // <ProtectedRoute>
                <MainLayout />
            // {/* </ProtectedRoute> */}
        ),
        children: [
            { index: true, element: <Dashboard /> },
            // Management
            { path: "users", element: <Users /> },
            { path: "orders", element: <Orders /> },
            { path: "standout-deals", element: <StandoutDeals /> },
            { path: "standout-deals/add", element: <AddDeal /> },
            { path: "standout-deals/edit/:id", element: <EditDeal /> },
            { path: "miwahdiss", element: <Miwahdiss /> },
            { path: "miwahdiss/add", element: <AddEvent /> },
            { path: "miwahdiss/edit/:id", element: <EditEvent /> },
            { path: "logo", element: <Logo /> },
            { path: "quote-request", element: <QuoteRequest /> },
            { path: "staff-managements", element: <StaffManagements /> },
            { path: "make-admin", element: <MakeAdmin /> },

            // Products
            { path: "products/all", element: <AllProducts /> },
            { path: "products/add", element: <AddProduct /> },
            { path: "products/categories", element: <Categories /> },
            { path: "products/attributes", element: <ProductAttributes /> },
            
            // Settings
            { path: "notifications", element: <Notifications /> },
            { path: "settings/profile", element: <Profile /> },
            { path: "settings/about", element: <About /> },
            { path: "settings/terms", element: <Terms /> },
            { path: "settings/privacy", element: <Privacy /> },
            { path: "settings/faq", element: <FAQ /> },
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <Login /> },
            { path: "forgot-password", element: <ForgotPassword /> },
            { path: "reset-password", element: <ResetPassword /> },
            { path: "verify", element: <CodeVerification /> },
        ]
    }
]);