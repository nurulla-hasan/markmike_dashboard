import { useMemo, useState } from "react";
import { Check, Loader2, Search, User2 } from "lucide-react";

import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type StaffMember = {
  id: string;
  name: string;
  role: string;
};

const MOCK_STAFF: StaffMember[] = [
  { id: "1", name: "Alex Johnson", role: "Production Lead" },
  { id: "2", name: "Maria Gomez", role: "Embroidery Specialist" },
  { id: "3", name: "Rahim Uddin", role: "Printing Operator" },
  { id: "4", name: "Sara Ahmed", role: "Quality Checker" },
];

type AssignProductionStaffModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const AssignProductionStaffModal = ({
  open,
  onOpenChange,
}: AssignProductionStaffModalProps) => {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredStaff = useMemo(
    () =>
      MOCK_STAFF.filter((staff) =>
        staff.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search]
  );

  const handleConfirm = () => {
    if (!selectedId) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onOpenChange(false);
      setSelectedId(null);
      setSearch("");
    }, 400);
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Assign production staff"
      description="Select a staff member for this order."
    >
      <div className="flex flex-col gap-4 p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search staff..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <ScrollArea className="h-72 rounded-md border p-2">
          {filteredStaff.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
              <User2 className="h-6 w-6" />
              <span>No staff found</span>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {filteredStaff.map((staff) => {
                const isSelected = staff.id === selectedId;

                return (
                  <button
                    key={staff.id}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-transparent hover:bg-muted"
                    }`}
                    onClick={() =>
                      setSelectedId(isSelected ? null : staff.id)
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {staff.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{staff.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {staff.role}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>

        <div className="flex justify-end pt-2">
          <Button
            onClick={handleConfirm}
            disabled={!selectedId || isSubmitting}
          >
            {isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Assign
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

