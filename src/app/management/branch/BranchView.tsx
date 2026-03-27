import { MapPin, Phone, Mail, Printer, Monitor, UserPlus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import type { ColumnDef } from "@tanstack/react-table";
import type { IBranchStaff } from "@/types/branch.type";
import PageHeader from "@/components/ui/custom/page-header";
import { AddStaffModal } from "@/components/management/branch/add-staff-modal";

const BranchView = () => {
  const navigate = useNavigate();
  //   const { id } = useParams();

  const mockBranch = {
    id: "1",
    name: "Montego Bay Branch",
    status: "Active",
    address: "45 Market Street, Montego Bay, Jamaica",
    phone: "+1-876-555-0101",
    email: "nsujon@gmail.com",
    printersCount: 3,
    kiosksCount: 3,
    totalOrders: 847,
  };

  const mockStaff: IBranchStaff[] = [
    { id: "1", name: "Nm Sujon", email: "msujon872@gmail.com", designation: "Production staff" },
    { id: "2", name: "Nm Sujon", email: "msujon872@gmail.com", designation: "Pos staff" },
  ];

  const columns: ColumnDef<IBranchStaff>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="text-sm font-medium">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "designation",
      header: "Designation",
      cell: ({ row }) => <div className="text-sm text-muted-foreground">{row.getValue("designation")}</div>,
    },
    {
      id: "actions",
      header: () => <div className="text-right">Action</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon-sm" className="text-emerald-500 hover:bg-emerald-50">
            <UserPlus className="h-4 w-4" />
          </Button>
          <ConfirmationModal
            title="Remove Staff?"
            description={`Are you sure you want to remove ${row.original.name} from this branch?`}
            onConfirm={() => console.log("Remove staff", row.original.id)}
            trigger={
              <Button variant="ghost" size="icon-sm" className="text-destructive hover:bg-destructive/5">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      ),
    },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <PageHeader
            title={mockBranch.name}
            showBack
          />
          <div className="flex items-center gap-4">
            <Button variant="outline">
              Delete
            </Button>
            <Button onClick={() => navigate(`/branch/edit/${mockBranch.id}`)}>
              Edit
            </Button>
          </div>
        </div>

        {/* Branch Info Card */}
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row justify-between gap-12">
              <div className="space-y-6 flex-1">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-foreground">{mockBranch.name}</h2>
                  <Badge variant="success" className="font-normal rounded-sm">
                    {mockBranch.status}
                  </Badge>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3 text-muted-foreground">
                    <MapPin className="h-5 w-5 shrink-0 mt-0.5" />
                    <span className="font-medium">{mockBranch.address}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{mockBranch.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{mockBranch.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Printer className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{mockBranch.printersCount} Printers</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Monitor className="h-5 w-5 shrink-0" />
                    <span className="font-medium">{mockBranch.kiosksCount} Kiosk</span>
                  </div>
                </div>
              </div>

              <div className="lg:w-1/3 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Account Statistics</h3>
                  <div className="flex items-center justify-between py-4 border-b">
                    <span className="text-muted-foreground">Total Order:</span>
                    <span className="text-2xl font-bold">{mockBranch.totalOrders}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Staff Management Section */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-foreground">Staff Management</h1>
          <AddStaffModal/>
        </div>
        <DataTable
          columns={columns}
          data={mockStaff}
          pageSize={5}
        />
      </div>
    </PageLayout>
  );
};

export default BranchView;
