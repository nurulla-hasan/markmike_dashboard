import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { DataTable } from "@/components/ui/custom/data-table";
import { SearchInput } from "@/components/ui/custom/search-input";
import type { QuoteRequest } from "@/schemas/quote-request.schema";
import { columns } from "@/components/management/quote-request/columns";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const DUMMY_QUOTES: QuoteRequest[] = [
  {
    id: "1",
    customerName: "Nm Sujon",
    customerEmail: "nmsujon@gmail.com",
    productName: "Banner",
    productSize: "24x10",
    productMaterial: "Tarpulin",
    quantity: "100 pc",
    customerMessage:
      "Lorem ipsum dolor sit amet consectetur. Ut pulvinar mattis auctor ipsum sed donec ac facilisis. Quisque nunc velit id habitant dolor. At in mauris semper leo. Ac praesent eu nisl tortor egestas fringilla.",
    productImage:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
    status: "pending",
    date: "2026-02-24",
  },
  {
    id: "2",
    customerName: "Rakibul Islam",
    customerEmail: "rakib.islam@mikefire.com",
    productName: "Flyer",
    productSize: "A4",
    productMaterial: "Glossy Paper",
    quantity: "500 pc",
    customerMessage: "I need high-quality flyers for our upcoming event.",
    productImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    status: "reviewed",
    date: "2026-02-23",
  },
  {
    id: "3",
    customerName: "Sabbir Ahmed",
    customerEmail: "sabbir.ahmed@mikefire.com",
    productName: "Business Card",
    productSize: "3.5x2",
    productMaterial: "Matte Card",
    quantity: "1000 pc",
    customerMessage: "Professional business cards with gold foil.",
    productImage:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop",
    status: "completed",
    date: "2026-02-22",
  },
];

const QuoteRequest = () => {
  const [date, setDate] = useState<Date>();

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Customer Queries"
          description="Manage and respond to customer quote requests."
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full sm:w-fit justify-start text-left",
                  !date && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {date ? format(date, "PPP") : <span>Filter by date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0 overflow-hidden"
              align="start"
            >
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <SearchInput placeholder="Search requests..." />
        </div>
      </div>

      <DataTable columns={columns} data={DUMMY_QUOTES} />
    </PageLayout>
  );
};

export default QuoteRequest;
