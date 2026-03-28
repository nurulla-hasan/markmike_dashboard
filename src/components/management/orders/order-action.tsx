import { useState } from "react";
import { Eye, MoreHorizontal, UserCog, XCircle, ChevronDown } from "lucide-react";

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
import type { TDashboardRole } from "@/components/dashboard/dashboard-stats";

type OrderActionProps = {
  order: TOrder;
  role?: TDashboardRole;
};

export const OrderAction = ({ order, role: initialRole = "super_admin" }: OrderActionProps) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [role, setRole] = useState<TDashboardRole>(initialRole);

  const isSuperAdmin = role === "super_admin";

  return (
    <div className="flex items-center gap-2">
      {/* Role Switcher for Testing */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="h-8 text-[10px] gap-1 px-2 border-dashed">
            Role: {role}
            <ChevronDown className="h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setRole("super_admin")}>
            Super Admin
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRole("pos_staff")}>
            POS Staff
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRole("production_staff")}>
            Production Staff
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

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
          
          {isSuperAdmin && (
            <>
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
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <OrderDetailsModal
        order={order}
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        onOpenRejectSample={() => setRejectOpen(true)}
      />

      {isSuperAdmin && (
        <>
          <AssignProductionStaffModal
            open={assignOpen}
            onOpenChange={setAssignOpen}
          />

          <RejectSampleModal open={rejectOpen} onOpenChange={setRejectOpen} />
        </>
      )}
    </div>
  );
};

