import { useState } from "react";

import PageLayout from "@/components/common/page-layout";
import { ProductCard } from "@/components/products/all-products/product-card";
import {
  ProductsFilter,
  type ProductsFilterState,
} from "@/components/products/all-products/products-filter";
import type { TProduct } from "@/types/product.type";

const mockProducts = [
  {
    id: "1",
    name: "Canvas Jersey T-shirt",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: ["#ffffff", "#d1d5db", "#ef4444", "#22c55e", "#eab308", "#a855f7"],
    soldCount: 1500,
  },
  {
    id: "2",
    name: "Canvas Jersey T-shirt",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e72333dbdb?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: ["#ffffff", "#d1d5db", "#ef4444", "#22c55e", "#eab308", "#a855f7"],
    soldCount: 1500,
  },
  {
    id: "3",
    name: "Canvas Jersey T-shirt",
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: ["#ffffff", "#d1d5db", "#ef4444", "#22c55e", "#eab308", "#a855f7"],
    soldCount: 1500,
  },
  {
    id: "4",
    name: "Canvas Jersey T-shirt",
    image:
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: ["#ffffff", "#d1d5db", "#ef4444", "#22c55e", "#eab308", "#a855f7"],
    soldCount: 1500,
  },
  {
    id: "5",
    name: "Flyers business",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: [],
    soldCount: 1500,
  },
  {
    id: "6",
    name: "Flyers business",
    image:
      "https://images.unsplash.com/photo-1596265371388-43edbaadab94?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: [],
    soldCount: 1500,
  },
  {
    id: "7",
    name: "Flyers business",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b7993143a2d?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: [],
    soldCount: 1500,
  },
  {
    id: "8",
    name: "Flyers business",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&auto=format&fit=crop&q=60",
    rating: 4.5,
    reviews: 1500,
    price: 70.0,
    currency: "JMD",
    deliveryTime: "3 days super rush delivery",
    colors: [],
    soldCount: 1500,
  },
];

const AllProducts = () => {
  const [filter, setFilter] = useState<ProductsFilterState>({
    category: "all",
    search: "",
  });

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-2xl font-bold tracking-tight">All products</h1>

          <ProductsFilter filter={filter} setFilter={setFilter}/>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mockProducts.map((product) => (
            <ProductCard key={product.id} product={product as TProduct} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default AllProducts;
