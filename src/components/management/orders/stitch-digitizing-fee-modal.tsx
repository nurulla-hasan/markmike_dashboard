import { useState } from "react";
import { ImageIcon } from "lucide-react";

import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type StitchDigitizingFeeModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: {
    stitchCount: string;
    digitizingFee: string;
    sampleName: string | null;
  }) => void;
};

export const StitchDigitizingFeeModal = ({
  open,
  onOpenChange,
  onSubmit,
}: StitchDigitizingFeeModalProps) => {
  const [stitchCount, setStitchCount] = useState("");
  const [digitizingFee, setDigitizingFee] = useState("");
  const [sampleName, setSampleName] = useState<string | null>(null);

  const handleSubmit = () => {
    onOpenChange(false);
    onSubmit?.({ stitchCount, digitizingFee, sampleName });
    setStitchCount("");
    setDigitizingFee("");
    setSampleName(null);
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Add Stitch count & digitizing fee"
    >
      <div className="flex flex-col gap-5 p-6">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Stitch count
          </span>
          <Input
            placeholder="Type here.."
            value={stitchCount}
            onChange={(e) => setStitchCount(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Digitizing fee
          </span>
          <Input
            placeholder="Type here.."
            value={digitizingFee}
            onChange={(e) => setDigitizingFee(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">
            Add sample image
          </span>
          <label className="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm text-muted-foreground">
            <ImageIcon className="h-4 w-4" />
            <span className="truncate">
              {sampleName || "Upload sample"}
            </span>
            <input
              type="file"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                setSampleName(file ? file.name : null);
              }}
            />
          </label>
        </div>

        <div className="flex justify-center pt-2">
          <Button
            className="px-12 bg-destructive hover:bg-destructive/90"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </ModalWrapper>
  );
};

