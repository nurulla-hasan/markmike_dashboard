import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { DataTable } from "@/components/ui/custom/data-table";
import type { ColumnDef } from "@tanstack/react-table";

interface IAuditLog {
  id: string;
  userName: string;
  userType: string;
  action: string;
  details: string;
  timestamp: string;
}

const MOCK_LOGS: IAuditLog[] = [
  {
    id: "1",
    userName: "Sujon",
    userType: "Admin",
    action: "Create New Template",
    details: "Create New Template for product",
    timestamp: "20-02-2026, 10.30am",
  },
  {
    id: "2",
    userName: "Sujon",
    userType: "Staff",
    action: "Place New Order",
    details: "Place New Order for mustfizur",
    timestamp: "20-02-2026, 10.30am",
  },
  {
    id: "3",
    userName: "Sujon",
    userType: "Admin",
    action: "Create New Template",
    details: "Create New Template for product",
    timestamp: "20-02-2026, 10.30am",
  },
];

const columns: ColumnDef<IAuditLog>[] = [
  {
    accessorKey: "userName",
    header: "User name",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("userName")}</div>,
  },
  {
    accessorKey: "userType",
    header: "User type",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("userType")}</div>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div className="text-foreground/80">{row.getValue("action")}</div>,
  },
  {
    accessorKey: "details",
    header: "Details",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("details")}</div>,
  },
  {
    accessorKey: "timestamp",
    header: "Time stamp",
    cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("timestamp")}</div>,
  },
];

const AuditLog = () => {
  return (
    <PageLayout>
      <div className="space-y-6">
        <PageHeader title="Audit Log"/>
        <DataTable
          columns={columns}
          data={MOCK_LOGS}
          pageSize={10}
        />
      </div>
    </PageLayout>
  );
};

export default AuditLog;
