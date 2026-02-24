import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import type { QuoteRequest } from "@/schemas/quote-request.schema";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useState } from "react";
import { GivePriceModal } from "./give-price-modal";

interface ViewQuoteModalProps {
  quote: QuoteRequest;
}

export function ViewQuoteModal({ quote }: ViewQuoteModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <ModalWrapper
      open={open}
      onOpenChange={setOpen}
      title="Quote Details"
      actionTrigger={
        <Button
          variant="ghost"
          size="icon-sm"
          title="View Details"
        >
          <Eye />
        </Button>
      }
    >
      <div className="p-6 space-y-6">
        {/* Main Info Section */}
        <div className="flex flex-col gap-6">
          {/* Top Section: Customer and Product Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Info Box */}
            <div className="bg-secondary/20 p-6 rounded-3xl flex flex-col justify-center space-y-3">
              <h3 className="text-xl font-bold tracking-tight">{quote.customerName}</h3>
              <div className="flex flex-col space-y-0.5">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</span>
                <span className="text-sm font-medium break-all leading-snug text-muted-foreground/90">{quote.customerEmail}</span>
              </div>
            </div>

            {/* Product Summary Box */}
            <div className="bg-secondary/20 p-6 rounded-3xl flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white flex items-center justify-center shadow-sm shrink-0">
                <img
                  src={quote.productImage}
                  alt={quote.productName}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col space-y-0.5">
                <h3 className="text-lg font-bold leading-tight">{quote.productName}</h3>
                <p className="text-xs font-bold text-muted-foreground">{quote.quantity}</p>
              </div>
            </div>
          </div>

          {/* Detailed Specs Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-secondary/10 py-3 px-2 rounded-2xl text-center space-y-0.5 border border-secondary/5">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Size</p>
              <p className="text-xs font-bold">{quote.productSize}</p>
            </div>
            <div className="bg-secondary/10 py-3 px-2 rounded-2xl text-center space-y-0.5 border border-secondary/5">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Material</p>
              <p className="text-xs font-bold">{quote.productMaterial}</p>
            </div>
            <div className="bg-secondary/10 py-3 px-2 rounded-2xl text-center space-y-0.5 border border-secondary/5">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Status</p>
              <p className="text-xs font-bold capitalize">{quote.status}</p>
            </div>
            <div className="bg-secondary/10 py-3 px-2 rounded-2xl text-center space-y-0.5 border border-secondary/5">
              <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Date</p>
              <p className="text-xs font-bold">{quote.date}</p>
            </div>
          </div>
        </div>

        {/* Customer Message Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="h-3.5 w-1 bg-primary rounded-full" />
            <h4 className="text-sm font-bold">Customer say's</h4>
          </div>
          <div className="p-6 rounded-3xl bg-secondary/5 text-sm leading-relaxed text-muted-foreground/80 min-h-25 border border-secondary/10">
            {quote.customerMessage}
          </div>
        </div>

        {/* Give Price Action Section */}
        <div className="pt-2">
          <GivePriceModal quote={quote} />
        </div>
      </div>
    </ModalWrapper>
  );
}
