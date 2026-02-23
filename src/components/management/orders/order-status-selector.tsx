import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types/order.type";
import { StitchDigitizingFeeModal } from "./stitch-digitizing-fee-modal";

type OrderStatusSelectorProps = {
  status: OrderStatus;
  onStatusChange?: (status: OrderStatus) => void;
};

const statusStyles: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  Pending: {
    label: "Pending",
    className:
      "border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 dark:border-gray-800 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800",
  },
  Processing: {
    label: "Processing",
    className:
      "border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-200 dark:border-blue-800 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-900/50",
  },
  "Awaiting Approval": {
    label: "Awaiting Approval",
    className:
      "border-purple-200 bg-purple-100 text-purple-700 hover:bg-purple-200 dark:border-purple-800 dark:bg-purple-900/30 dark:text-purple-300 dark:hover:bg-purple-900/50",
  },
  Production: {
    label: "Production",
    className:
      "border-orange-200 bg-orange-100 text-orange-700 hover:bg-orange-200 dark:border-orange-800 dark:bg-orange-900/30 dark:text-orange-300 dark:hover:bg-orange-900/50",
  },
  "On The Way": {
    label: "On The Way",
    className:
      "border-teal-200 bg-teal-100 text-teal-700 hover:bg-teal-200 dark:border-teal-800 dark:bg-teal-900/30 dark:text-teal-300 dark:hover:bg-teal-900/50",
  },
  Shipped: {
    label: "Shipped",
    className:
      "border-green-200 bg-green-100 text-green-700 hover:bg-green-200 dark:border-green-800 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-900/50",
  },
  Canceled: {
    label: "Canceled",
    className:
      "border-red-200 bg-red-100 text-red-700 hover:bg-red-200 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300 dark:hover:bg-red-900/50",
  },
};

const statuses: OrderStatus[] = [
  "Pending",
  "Processing",
  "Awaiting Approval",
  "Production",
  "On The Way",
  "Shipped",
  "Canceled",
];

export const OrderStatusSelector = ({
  status: initialStatus,
  onStatusChange,
}: OrderStatusSelectorProps) => {
  const [status, setStatus] = useState<OrderStatus>(initialStatus);
  const [open, setOpen] = useState(false);
  const [showProductionModal, setShowProductionModal] = useState(false);

  const handleStatusSelect = (newStatus: OrderStatus) => {
    // Check if the user selected "Processing"
    if (newStatus === "Processing") {
      setShowProductionModal(true);
      setStatus(newStatus);
      onStatusChange?.(newStatus);
    } else {
      setStatus(newStatus);
      onStatusChange?.(newStatus);
    }
    setOpen(false);
  };

  const currentStyle = statusStyles[status] || statusStyles.Pending;

  return (
    <>
      <DropdownMenu open={open} onOpenChange={setOpen}>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className={cn(
              "flex items-center justify-between gap-2 w-40 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors outline-none",
              currentStyle.className
            )}
          >
            <span className="truncate">{status}</span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-45">
          {statuses.map((s) => (
            <DropdownMenuItem
              key={s}
              onClick={() => handleStatusSelect(s)}
              className={cn(
                "flex items-center justify-between mb-1 last:mb-0 cursor-pointer",
                statusStyles[s].className
              )}
            >
              {s}
              {s === status && <Check className="h-4 w-4" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <StitchDigitizingFeeModal
        open={showProductionModal}
        onOpenChange={setShowProductionModal}
        onSubmit={(data) => {
          console.log("Processing data:", data);
        }}
      />
    </>
  );
};
