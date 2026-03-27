export interface IBranchPrinter {
  id: string;
  name: string;
  ipAddress: string;
}

export interface IBranchKiosk {
  id: string;
  name: string;
  ipAddress: string;
}

export interface IBranch {
  id: string;
  name: string;
  code: string;
  status: "Active" | "Inactive";
  address: string;
  phone: string;
  email: string;
  printersCount: number;
  kiosksCount: number;
  image?: string;
  description?: string;
  mapLink?: string;
  embeddedCode?: string;
  printers?: IBranchPrinter[];
  kiosks?: IBranchKiosk[];
  totalOrders?: number;
}

export interface IBranchStaff {
  id: string;
  name: string;
  email: string;
  designation: string;
}
