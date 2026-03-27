export type CatalogType = "Retail" | "Corporate";
export type CatalogStatus = "Active" | "Inactive";
export type PricingMode = "Fixed" | "Tier";

export interface ICatalogProduct {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  catalogPrice?: number;
  pricingMode: PricingMode;
  moq: number;
  quantityIncrementStep: number;
}

export interface ICatalog {
  id: string;
  name: string;
  type: CatalogType;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  status: CatalogStatus;
  editorPermissions: string;
  defaultDesignTemplates: string[];
  products: ICatalogProduct[];
  itemCount: number;
  createdAt: string;
}
