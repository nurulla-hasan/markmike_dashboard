import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { DealsFilter } from "@/components/management/standout-deals/deals-filter";
import { DealCard } from "@/components/management/standout-deals/deal-card";
import type { Deal } from "@/types/deal.type";

const mockDeals: Deal[] = [
  {
    id: "1",
    name: "Dry fit Deal",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
  },
  {
    id: "2",
    name: "Dry fit Deal",
    image:
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
  },
  {
    id: "3",
    name: "Dry fit Deal",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
  },
  {
    id: "4",
    name: "Dry fit Deal",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
  },
];

const StandoutDeals = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Standout Deals"
          description="Manage and showcase your best deals to customers."
        />
        <DealsFilter />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {mockDeals.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </PageLayout>
  );
};

export default StandoutDeals;
