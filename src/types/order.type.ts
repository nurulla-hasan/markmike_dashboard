export type OrderStatus =
  | "Pending"
  | "Processing"
  | "Awaiting Approval"
  | "Shipped"
  | "Production"
  | "On The Way"
  | "Canceled";

export type PaymentStatus = "Paid" | "Unpaid";

export interface TOrderProduct {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  sizeInfo?: string;
}

export interface TOrder {
  id: string;
  orderId: string;
  product: TOrderProduct;
  quantity: number;
  totalPrice: number;
  paymentStatus: PaymentStatus;
  deliveryMethod: string;
  status: OrderStatus;
  placedOn: string;
  dueDate: string;
  address: string;
  paymentLabel: string;
  type: string;
  subtotal: number;
  taxes: number;
  volumeDiscount: number;
  shippingFee: number;
  total: number;
  stitchCount?: number;
  logoDigitizingFee?: number;
  designImages?: string[];
  sampleImages?: string[];
}

