import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { SearchInput } from "@/components/ui/custom/search-input";
import type { Admin } from "@/schemas/admin.schema";
import { MakeAdminModal } from "@/components/management/make-admin/make-admin-modal";
import { columns } from "@/components/management/make-admin/columns";

const DUMMY_ADMINS: Admin[] = [
  {
    id: "1",
    name: "Afridi Hasan",
    email: "afridi.hasan@mikefire.com",
    designation: "Super Admin",
    branch: "Montego",
  },
  {
    id: "2",
    name: "Sabbir Ahmed",
    email: "sabbir.ahmed@mikefire.com",
    designation: "Branch Manager",
    branch: "Falmouth",
  },
  {
    id: "3",
    name: "Jannatul Ferdous",
    email: "jannat.f@mikefire.com",
    designation: "Admin",
    branch: "Kingston",
  },
  {
    id: "4",
    name: "Rakibul Islam",
    email: "rakib.islam@mikefire.com",
    designation: "Super Admin",
    branch: "Montego",
  },
  {
    id: "5",
    name: "Nusrat Jahan",
    email: "nusrat.j@mikefire.com",
    designation: "Branch Manager",
    branch: "Falmouth",
  },
  {
    id: "6",
    name: "Ariful Haque",
    email: "arif.haque@mikefire.com",
    designation: "Admin",
    branch: "Kingston",
  },
  {
    id: "7",
    name: "Tanvir Rahman",
    email: "tanvir.r@mikefire.com",
    designation: "Super Admin",
    branch: "Montego",
  },
  {
    id: "8",
    name: "Sumaiya Akter",
    email: "sumaiya.a@mikefire.com",
    designation: "Branch Manager",
    branch: "Falmouth",
  },
];

const MakeAdmin = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="Make Admin"
            description="Assign and manage administrative privileges for staff."
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <SearchInput placeholder="Search..." />
            <MakeAdminModal />
          </div>
        </div>

        <DataTable columns={columns} data={DUMMY_ADMINS} />
      </div>
    </PageLayout>
  );
};

export default MakeAdmin;
