import { useState } from "react";

import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type RejectSampleModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const RejectSampleModal = ({
  open,
  onOpenChange,
}: RejectSampleModalProps) => {
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    onOpenChange(false);
    setReason("");
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Reject sample"
      description="Reason"
    >
      <div className="flex flex-col gap-4 p-6">
        <Textarea
          placeholder="Type here.."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="flex justify-center">
          <Button
            className="px-10 bg-destructive hover:bg-destructive/90"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

