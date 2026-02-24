import PageHeader from "@/components/ui/custom/page-header";
import PageLayout from "@/components/common/page-layout";
import { DataTable } from "@/components/ui/custom/data-table";
import { columns } from "@/components/management/quote-request/columns";
import { QuoteRequestModal } from "@/components/management/quote-request/quote-request-modal";
import { SearchInput } from "@/components/ui/custom/search-input";
import type { QuoteRequest } from "@/schemas/quote-request.schema";

const DUMMY_QUOTES: QuoteRequest[] = [
  {
    id: "1",
    name: "Afridi Hasan",
    email: "afridi.hasan@mikefire.com",
    designation: "Production Manager",
    branch: "Montego",
  },
  {
    id: "2",
    name: "Sabbir Ahmed",
    email: "sabbir.ahmed@mikefire.com",
    designation: "POS Supervisor",
    branch: "Falmouth",
  },
  {
    id: "3",
    name: "Jannatul Ferdous",
    email: "jannat.f@mikefire.com",
    designation: "Inventory Lead",
    branch: "Kingston",
  },
  {
    id: "4",
    name: "Rakibul Islam",
    email: "rakib.islam@mikefire.com",
    designation: "Quality Control",
    branch: "Montego",
  },
  {
    id: "5",
    name: "Nusrat Jahan",
    email: "nusrat.j@mikefire.com",
    designation: "Sales Executive",
    branch: "Falmouth",
  },
  {
    id: "6",
    name: "Ariful Haque",
    email: "arif.haque@mikefire.com",
    designation: "Logistics Coordinator",
    branch: "Kingston",
  },
  {
    id: "7",
    name: "Tanvir Rahman",
    email: "tanvir.r@mikefire.com",
    designation: "Operations Head",
    branch: "Montego",
  },
  {
    id: "8",
    name: "Sumaiya Akter",
    email: "sumaiya.a@mikefire.com",
    designation: "HR Specialist",
    branch: "Falmouth",
  },
];

const QuoteRequest = () => {
  return (
    <PageLayout>
      <div className="space-y-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <PageHeader
            title="All Staff"
            description="Manage and view all your staff members."
          />
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <SearchInput placeholder="Search..." />
            <QuoteRequestModal />
          </div>
        </div>

        <DataTable columns={columns} data={DUMMY_QUOTES} />
      </div>
    </PageLayout>
  );
};

export default QuoteRequest;
