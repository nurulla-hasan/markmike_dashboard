import { createBrowserRouter } from "react-router-dom";
import MainLayout from "@/layout/main-layout";
import { lazy } from "react";
import AuthLayout from "@/layout/auth-layout";

// import ProtectedRoute from "@/layout/protected-route";

//======================================================================================================================
// App pages (all under src/app)
const Notifications = lazy(() => import("@/app/settings/notifications/Notifications"));
const Profile = lazy(() => import("@/app/settings/profile/Profile"));
const Privacy = lazy(() => import("@/app/settings/privacy/Privacy"));
const Terms = lazy(() => import("@/app/settings/terms/Terms"));
const HeroBanner = lazy(() => import("@/app/settings/hero-banner/HeroBanner"));
const ContactUs = lazy(() => import("@/app/settings/contact-us/ContactUs"));
const AuditLog = lazy(() => import("@/app/settings/audit-log/AuditLog"));
const CreateOrder = lazy(() => import("@/app/management/orders/create-order/CreateOrder"));

const Dashboard = lazy(() => import("@/app/dashboard/Dashboard"));
const Users = lazy(() => import("@/app/management/users/Users"));
const UserDetails = lazy(() => import("@/app/management/users/details/UserDetails"));
const Orders = lazy(() => import("@/app/management/orders/Orders"));
// const StandoutDeals = lazy(() => import("@/app/management/standout-deals/StandoutDeals"));
// const StandoutAddDeal = lazy(() => import("@/app/management/standout-deals/add-deal/AddDeal"));
// const StandoutEditDeal = lazy(() => import("@/app/management/standout-deals/edit-deal/EditDeal"));
const Miwahdiss = lazy(() => import("@/app/management/miwahdiss/Miwahdiss"));
const AddEvent = lazy(() => import("@/app/management/miwahdiss/add-event/AddEvent"));
const EditEvent = lazy(() => import("@/app/management/miwahdiss/edit-event/EditEvent"));
const MiwahdissView = lazy(() => import("@/app/management/miwahdiss/view/MiwahdissView"));
const MiwahdissModeration = lazy(() => import("@/app/management/miwahdiss/moderation/MiwahdissModeration"));
const Logo = lazy(() => import("@/app/management/logo/Logo"));
const QuoteRequest = lazy(() => import("@/app/management/quote-request/QuoteRequest"));
const Catalog = lazy(() => import("@/app/management/catalog/Catalog"));
const AddCatalog = lazy(() => import("@/app/management/catalog/add/AddCatalog"));
const CatalogView = lazy(() => import("@/app/management/catalog/view/CatalogView"));
const TemplateLibrary = lazy(() => import("@/app/management/template-library/TemplateLibrary"));
const TemplateForm = lazy(() => import("@/components/management/template-library/TemplateForm"));
// const StaffManagements = lazy(() => import("@/app/management/staff-managements/StaffManagements"));
const MakeAdmin = lazy(() => import("@/app/management/make-admin/MakeAdmin"));
// const CanvasEditor = lazy(() => import("@/app/management/canvas-editor/CanvasEditor"));
const ArtworkLibrary = lazy(() => import("@/app/design-tools/ArtworkLibrary"));
const ArtworkSubCategories = lazy(() => import("@/app/design-tools/ArtworkSubCategories"));
const ArtworkAssets = lazy(() => import("@/app/design-tools/ArtworkAssets"));
const BranchList = lazy(() => import("@/app/management/branch/BranchList"));
const BranchForm = lazy(() => import("@/components/management/branch/BranchForm"));
const BranchView = lazy(() => import("@/app/management/branch/BranchView"));
const FontManager = lazy(() => import("@/app/design-tools/FontManager"));


const AllProducts = lazy(() => import("@/app/products/all-products/AllProducts"));
const AddProduct = lazy(() => import("@/app/products/add-product/AddProduct"));
const Categories = lazy(() => import("@/app/products/categories/Categories"));
const ProductAttributes = lazy(() => import("@/app/products/product-attributes/ProductAttributes"));
const Campaigns = lazy(() => import("@/app/products/campaigns/Campaigns"));
const CampaignView = lazy(() => import("@/app/products/campaigns/view/CampaignView"));
const Deals = lazy(() => import("@/app/products/deals/Deals"));
const DealsAddDeal = lazy(() => import("@/app/products/deals/add/AddDeal"));
const DealsEditDeal = lazy(() => import("@/app/products/deals/edit/EditDeal"));

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
            { path: "users/:id", element: <UserDetails /> },
            { path: "orders", element: <Orders /> },
            { path: "create-new-order", element: <CreateOrder /> },
            // { path: "standout-deals", element: <StandoutDeals /> },
            // { path: "standout-deals/add", element: <StandoutAddDeal /> },
            // { path: "standout-deals/edit/:id", element: <StandoutEditDeal /> },
            { path: "miwahdiss", element: <Miwahdiss /> },
            { path: "miwahdiss/add", element: <AddEvent /> },
            { path: "miwahdiss/edit/:id", element: <EditEvent /> },
            { path: "miwahdiss/view/:id", element: <MiwahdissView /> },
            { path: "miwahdiss/moderation", element: <MiwahdissModeration /> },
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/add", element: <AddCatalog /> },
            { path: "catalog/view/:id", element: <CatalogView /> },
            { path: "catalog/edit/:id", element: <AddCatalog /> },
            { path: "template-library", element: <TemplateLibrary /> },
            { path: "template-library/add", element: <TemplateForm /> },
            { path: "template-library/edit/:id", element: <TemplateForm /> },
            { path: "logo", element: <Logo /> },
            { path: "branch", element: <BranchList /> },
            { path: "branch/add", element: <BranchForm /> },
            { path: "branch/edit/:id", element: <BranchForm /> },
            { path: "branch/view/:id", element: <BranchView /> },
            { path: "quote-request", element: <QuoteRequest /> },
            // { path: "staff-managements", element: <StaffManagements /> },
            { path: "make-admin", element: <MakeAdmin /> },
            // { path: "canvas-editor", element: <CanvasEditor /> },

            // Design Tools
            { path: "design-tools/artwork-library", element: <ArtworkLibrary /> },
            { path: "design-tools/artwork-library/category/:id", element: <ArtworkSubCategories /> },
            { path: "design-tools/artwork-library/assets/:id", element: <ArtworkAssets /> },
            { path: "design-tools/font-manager", element: <FontManager /> },

            // Products
            { path: "products/all", element: <AllProducts /> },
            { path: "products/add", element: <AddProduct /> },
            { path: "products/categories", element: <Categories /> },
            { path: "products/attributes", element: <ProductAttributes /> },
            { path: "products/campaigns", element: <Campaigns /> },
            { path: "products/campaigns/view/:id", element: <CampaignView /> },
            { path: "products/deals", element: <Deals /> },
            { path: "products/deals/add", element: <DealsAddDeal /> },
            { path: "products/deals/edit/:id", element: <DealsEditDeal /> },

            // Settings
            { path: "notifications", element: <Notifications /> },
            { path: "settings/profile", element: <Profile /> },
            { path: "settings/terms", element: <Terms /> },
            { path: "settings/privacy", element: <Privacy /> },
            { path: "settings/hero-banner", element: <HeroBanner /> },
            { path: "settings/contact-us", element: <ContactUs /> },
            { path: "settings/audit-log", element: <AuditLog /> },
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