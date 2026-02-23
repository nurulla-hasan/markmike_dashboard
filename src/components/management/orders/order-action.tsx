import { useState } from "react";
import { Eye, MoreHorizontal, UserCog, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { TOrder } from "@/types/order.type";
import { OrderDetailsModal } from "./order-details-modal";
import { AssignProductionStaffModal } from "./assign-production-staff-modal";
import { RejectSampleModal } from "./reject-sample-modal";

type OrderActionProps = {
  order: TOrder;
};

export const OrderAction = ({ order }: OrderActionProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon-sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => setDetailsOpen(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setAssignOpen(true)}>
            <UserCog className="mr-2 h-4 w-4" />
            Assign staff
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => setRejectOpen(true)}
          >
            <XCircle className="mr-2 h-4 w-4" />
            Reject sample
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderDetailsModal
        order={order}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onOpenRejectSample={() => setRejectOpen(true)}
      />

      <AssignProductionStaffModal
        open={assignOpen}
        onOpenChange={setAssignOpen}
      />

      <RejectSampleModal open={rejectOpen} onOpenChange={setRejectOpen} />
    </>
  );
};

