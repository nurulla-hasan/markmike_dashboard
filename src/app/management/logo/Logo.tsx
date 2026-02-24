import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";
import { SearchInput } from "@/components/ui/custom/search-input";
import {
  LogoCard,
  type DigitizedLogo,
} from "@/components/management/logo/logo-card";

const DUMMY_LOGOS: DigitizedLogo[] = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&auto=format&fit=crop&q=60",
    name: "Phoenix Logo",
    count: 12,
    date: "24 Feb, 2026",
    price: 15000,
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&auto=format&fit=crop&q=60",
    name: "Abstract Blue",
    count: 8,
    date: "20 Feb, 2026",
    price: 12500,
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=800&auto=format&fit=crop&q=60",
    name: "Modern Rocket",
    count: 15,
    date: "18 Feb, 2026",
    price: 18000,
  },
  {
    id: "4",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&auto=format&fit=crop&q=60",
    name: "Minimalist Bird",
    count: 20,
    date: "15 Feb, 2026",
    price: 9000,
  },
  {
    id: "5",
    image:
      "https://images.unsplash.com/photo-1529926542502-77aceca00aa3?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Creative Spark",
    count: 10,
    date: "12 Feb, 2026",
    price: 11000,
  },
  {
    id: "6",
    image:
      "https://images.unsplash.com/photo-1583321500900-82807e458f3c?w=800&auto=format&fit=crop&q=60",
    name: "Eagle Shield",
    count: 5,
    date: "10 Feb, 2026",
    price: 25000,
  },
  {
    id: "7",
    image:
      "https://images.unsplash.com/photo-1617985562309-2aa7781f1608?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    name: "Nature Green",
    count: 14,
    date: "08 Feb, 2026",
    price: 13000,
  },
  {
    id: "8",
    image:
      "https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?w=800&auto=format&fit=crop&q=60",
    name: "Tech Solutions",
    count: 25,
    date: "05 Feb, 2026",
    price: 16500,
  },
  {
    id: "9",
    image:
      "https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop&q=60",
    name: "Gradient Wave",
    count: 9,
    date: "02 Feb, 2026",
    price: 14000,
  },
  {
    id: "10",
    image:
      "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60",
    name: "Marketing Peak",
    count: 18,
    date: "01 Feb, 2026",
    price: 17000,
  },
];

const Logo = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="All Digitized logo"
          description="Manage and view all your digitized logos."
        />
        <div>
          <SearchInput placeholder="Search..." />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {DUMMY_LOGOS.map((logo) => (
          <LogoCard key={logo.id} item={logo} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Logo;
