import { useState } from "react";

import PageLayout from "@/components/common/page-layout";
import { ordersColumns } from "@/components/management/orders/orders-columns";
import { OrdersFilter } from "@/components/management/orders/orders-filter";
import { DataTable } from "@/components/ui/custom/data-table";
import PageHeader from "@/components/ui/custom/page-header";
import type { OrderStatus, TOrder } from "@/types/order.type";

type OrdersFilterState = {
  status?: OrderStatus | "all";
  search?: string;
};

const mockOrders: TOrder[] = [
  {
    id: "1",
    orderId: "1234",
    product: {
      id: "p1",
      name: "Bella + Canvas Women's Tee",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
      basePrice: 300,
      sizeInfo: "L 10, M 20",
    },
    quantity: 20,
    totalPrice: 15000,
    paymentStatus: "Paid",
    deliveryMethod: "Express",
    status: "Pending",
    placedOn: "25/05/2025",
    dueDate: "25/05/2025",
    address: "c block , Road no : 03 ,Banasree ,Dhaka",
    paymentLabel: "Paid",
    type: "Printing",
    subtotal: 300,
    taxes: 30,
    volumeDiscount: 30,
    shippingFee: 30,
    total: 355,
    designImages: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60",
    ],
    sampleImages: [
      "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=500&auto=format&fit=crop&q=60",
    ],
  },
  {
    id: "2",
    orderId: "1235",
    product: {
      id: "p2",
      name: "Bella + Canvas Women's Tee",
      image:
        "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
      basePrice: 300,
      sizeInfo: "L 10, M 20",
    },
    quantity: 20,
    totalPrice: 15000,
    paymentStatus: "Paid",
    deliveryMethod: "Express",
    status: "Awaiting Approval",
    placedOn: "25/05/2025",
    dueDate: "25/05/2025",
    address: "c block , Road no : 03 ,Banasree ,Dhaka",
    paymentLabel: "Paid",
    type: "Printing",
    subtotal: 300,
    taxes: 30,
    volumeDiscount: 30,
    shippingFee: 30,
    total: 355,
    designImages: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60",
    ],
    sampleImages: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60",
    ],
  },
  {
    id: "3",
    orderId: "1236",
    product: {
      id: "p3",
      name: "Custom Banner",
      image:
        "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60",
      basePrice: 300,
      sizeInfo: "L 10, M 20",
    },
    quantity: 20,
    totalPrice: 15000,
    paymentStatus: "Paid",
    deliveryMethod: "Express",
    status: "Shipped",
    placedOn: "25/05/2025",
    dueDate: "25/05/2025",
    address: "c block , Road no : 03 ,Banasree ,Dhaka",
    paymentLabel: "Paid",
    type: "Printing",
    subtotal: 300,
    taxes: 30,
    volumeDiscount: 30,
    shippingFee: 30,
    total: 355,
    sampleImages: [
      "https://images.unsplash.com/photo-1562577309-4932fdd64cd1?w=500&auto=format&fit=crop&q=60",
    ],
  },
  {
    id: "4",
    orderId: "1237",
    product: {
      id: "p4",
      name: "Bella + Canvas Women's Tee",
      image:
        "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
      basePrice: 300,
      sizeInfo: "L 10, M 20",
    },
    quantity: 20,
    totalPrice: 15000,
    paymentStatus: "Paid",
    deliveryMethod: "Express",
    status: "Production",
    placedOn: "25/05/2025",
    dueDate: "25/05/2025",
    address: "c block , Road no : 03 ,Banasree ,Dhaka",
    paymentLabel: "Paid",
    type: "Printing",
    subtotal: 300,
    taxes: 30,
    volumeDiscount: 30,
    shippingFee: 30,
    total: 355,
    sampleImages: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=60",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500&auto=format&fit=crop&q=60",
    ],
  },
  {
    id: "5",
    orderId: "1238",
    product: {
      id: "p5",
      name: "Bella + Canvas Women's Tee",
      image:
        "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60",
      basePrice: 300,
      sizeInfo: "L 10, M 20",
    },
    quantity: 20,
    totalPrice: 15000,
    paymentStatus: "Paid",
    deliveryMethod: "Express",
    status: "On The Way",
    placedOn: "25/05/2025",
    dueDate: "25/05/2025",
    address: "c block , Road no : 03 ,Banasree ,Dhaka",
    paymentLabel: "Paid",
    type: "Printing",
    subtotal: 300,
    taxes: 30,
    volumeDiscount: 30,
    shippingFee: 30,
    total: 355,
    sampleImages: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500&auto=format&fit=crop&q=60",
    ],
  },
];

const Orders = () => {
  const [filter, setFilter] = useState<OrdersFilterState>({
    status: "all",
    search: "",
  });

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <PageHeader
            title="Orders"
            description="View and manage all customer orders."
            length={mockOrders.length}
          />
          <OrdersFilter filter={filter} setFilter={setFilter} />
        </div>

        <DataTable columns={ordersColumns} data={mockOrders} pageSize={5} />
      </div>
    </PageLayout>
  );
};

export default Orders;
