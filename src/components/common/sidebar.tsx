/* eslint-disable react-hooks/set-state-in-effect */
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import {
  Settings,
  LogOut,
  ChevronDown,
  UserRoundPen,
  MessageCircleQuestion,
  LayoutGrid,
  User,
  FileText,
  Info,
  Shield,
  Briefcase,
  ShoppingCart,
  Percent,
  MessageCircle,
  Image,
  FileQuestion,
  Users,
  ShieldAlert,
  Package,
  List,
  Tags,
  Layers,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
// import { useAppDispatch } from "@/redux/hooks";
// import { Logout } from "@/redux/feature/auth/authSlice";
import { Button } from "../ui/button";

const MAIN_NAV_ITEMS = [
  { name: "Overview", icon: LayoutGrid, href: "/" },
];

const MANAGEMENT_SUB_ITEMS = [
  { name: "Orders", icon: ShoppingCart, href: "/orders" },
  { name: "Users", icon: User, href: "/users" },
  { name: "Standout Deals", icon: Percent, href: "/standout-deals" },
  { name: "Miwahdiss", icon: MessageCircle, href: "/miwahdiss" },
  { name: "Logo", icon: Image, href: "/logo" },
  { name: "Quote Request", icon: FileQuestion, href: "/quote-request" },
  { name: "Staff Managements", icon: Users, href: "/staff-managements" },
  { name: "Make admin", icon: ShieldAlert, href: "/make-admin" },
];

const PRODUCTS_SUB_ITEMS = [
  { name: "All products", icon: Package, href: "/products/all" },
  { name: "Categories", icon: List, href: "/products/categories" },
  { name: "Product Attributes", icon: Tags, href: "/products/attributes" },
];

const SETTINGS_SUB_ITEMS = [
  { name: "Profile", icon: UserRoundPen, href: "/settings/profile" },
  { name: "FAQ", icon: MessageCircleQuestion, href: "/settings/faq" },
  { name: "About Us", icon: Info, href: "/settings/about" },
  { name: "Privacy Policy", icon: Shield, href: "/settings/privacy" },
  { name: "Terms", icon: FileText, href: "/settings/terms" },
];

const Sidebar = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  // const dispatch = useAppDispatch();
  const location = useLocation();
  const prevLocation = useRef(location);
  const section = location.pathname.split("/")[1] || "";
  const isSettingsPath = section === "settings";
  const isManagementPath = [
    "orders",
    "users",
    "standout-deals",
    "miwahdiss",
    "logo",
    "quote-request",
    "staff-managements",
    "make-admin",
  ].includes(section);
  const isProductsPath = section === "products";

  const [isSettingsOpen, setIsSettingsOpen] = useState(isSettingsPath);
  const [isManagementOpen, setIsManagementOpen] = useState(true);
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  useEffect(() => {
    if (isSettingsPath) setIsSettingsOpen(true);
    // if (isManagementPath) setIsManagementOpen(true);
    if (isProductsPath) setIsProductsOpen(true);
  }, [isSettingsPath, isManagementPath, isProductsPath]);

  useEffect(() => {
    if (prevLocation.current !== location && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
    prevLocation.current = location;
  }, [location, isSidebarOpen, setIsSidebarOpen]);

  const handleLogout = () => {
    // dispatch(Logout());
    console.log("Logged out");
  };

  return (
    <div
      className={`fixed top-0 left-0 z-40 h-screen bg-sidebar w-64 transition-transform duration-300 ease-in-out transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 flex flex-col`}
    >
      {/* Brand */}
      <div className="flex flex-col items-center px-6 py-4">
        <Link to="/" className="flex flex-col items-center">
          <img
            src="/logo.png"
            alt="GRABBY Logo"
            className="h-8 w-auto dark:invert"
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <ScrollArea className="h-[calc(100vh-133px)]">
        <nav className="grow space-y-2 p-4">
          {MAIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                `w-full flex items-center justify-start p-2 rounded-sm text-sm font-medium transition-colors duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                }`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <div className="flex items-center text-sm px-2">
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </div>
            </NavLink>
          ))}

          {/* Management group */}
          <Collapsible
            open={isManagementOpen}
            onOpenChange={setIsManagementOpen}
          >
            <CollapsibleTrigger
              className={`w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isManagementPath
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Briefcase className="mr-2 h-4 w-4" />
                Management
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isManagementOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {MANAGEMENT_SUB_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Products group */}
          <Collapsible
            open={isProductsOpen}
            onOpenChange={setIsProductsOpen}
          >
            <CollapsibleTrigger
              className={`w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isProductsPath
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Layers className="mr-2 h-4 w-4" />
                Products
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isProductsOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {PRODUCTS_SUB_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Settings group */}
          <Collapsible open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <CollapsibleTrigger
              className={`w-full mb-2 flex items-center justify-between p-2 rounded-sm text-base font-medium cursor-pointer transition-colors duration-200 
                    ${
                      isSettingsPath
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-accent hover:text-accent-foreground"
                    }
                            `}
            >
              <div className="flex items-center text-sm px-2">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </div>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-300 ${
                  isSettingsOpen ? "-rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2">
              {SETTINGS_SUB_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  className={({ isActive }) =>
                    `w-[90%] ml-5 flex items-center justify-start px-2 py-2 rounded-sm text-sm font-medium transition-colors duration-200  
                                ${
                                  isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent hover:text-accent-foreground"
                                }`
                  }
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <item.icon className="mr-2 w-4 h-4" />
                  {item.name}
                </NavLink>
              ))}
            </CollapsibleContent>
          </Collapsible>
        </nav>
      </ScrollArea>

      {/* Logout Button */}
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="justify-start w-full"
          onClick={handleLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
