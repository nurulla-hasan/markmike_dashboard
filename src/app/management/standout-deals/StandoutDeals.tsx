
import PageLayout from "@/components/common/page-layout";
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
      "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=500&auto=format&fit=crop&q=60",
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
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">All Deals</h1>
          <DealsFilter />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default StandoutDeals;
