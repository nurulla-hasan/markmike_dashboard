
import { useState } from "react";
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalStep = "quantity" | "summary";

export function QuantityModal() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<ModalStep>("quantity");
  const [quantities, setQuantities] = useState<Record<string, number>>({
    S: 0, M: 0, L: 0, XL: 0, "2XL": 0, "3XL": 0
  });

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  const totalQuantity = Object.values(quantities).reduce((acc, curr) => acc + curr, 0);

  const handleNextStep = () => {
    if (step === "quantity") {
      setStep("summary");
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset state when closing
      setStep("quantity");
    }
  };

  const updateQuantity = (size: string, delta: number) => {
    setQuantities(prev => ({
      ...prev,
      [size]: Math.max(0, prev[size] + delta)
    }));
  };

  return (
    <ModalWrapper
      open={open}
      onOpenChange={handleOpenChange}
      actionTrigger={<Button variant="outline">Get Price</Button>}
    >
      <div className="p-6 relative">

        {step === "quantity" ? (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-black">How many do you need?</h2>
              <p className="text-sm text-muted-foreground font-medium">Estimate a total quantity for a more accurate price.</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-black">Total Quantity: {totalQuantity}</span>
              </div>

              {/* Product Info Box */}
              <div className="border rounded-2xl p-6 bg-background space-y-6">
                <div className="flex gap-4">
                  <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden border shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop"
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="space-y-1">
                      <h4 className="font-black text-sm lg:text-base">Bella + Canvas Women's Jersey T-shirt</h4>
                      <p className="text-xs lg:text-sm text-muted-foreground font-medium">Color: White</p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-[10px] lg:text-xs font-black uppercase tracking-wider text-muted-foreground">ADULT</p>
                      <div className="flex flex-wrap gap-2 lg:gap-3">
                        {sizes.map((size) => (
                          <div key={size} className="flex flex-col items-center gap-1">
                            <button
                              onClick={() => updateQuantity(size, 1)}
                              className={cn(
                                "w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 flex items-center justify-center font-black transition-all",
                                quantities[size] > 0 ? "border-primary bg-primary/5" : "border-muted-foreground/20 hover:border-primary"
                              )}
                            >
                              {size}
                            </button>
                            {(size === "2XL" || size === "3XL") && (
                              <span className="text-[10px] font-black text-muted-foreground">+2.5$</span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="bg-muted/30 rounded-2xl p-6 space-y-6 border border-muted/50">
                <div className="space-y-2">
                  <h3 className="font-black text-base">Price breakdown</h3>
                  <p className="text-xs font-bold text-muted-foreground">Bella + Canvas Women's Jersey T-shirt</p>
                </div>

                <div className="space-y-4 pt-4 border-t border-muted-foreground/10">
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-muted-foreground font-medium">Quantity:</span>
                    <span className="text-muted-foreground">50pc</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-muted-foreground font-medium">Each item price :</span>
                    <span className="text-muted-foreground">$50.00</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-bold">
                    <span className="text-muted-foreground font-medium">Subtotal :</span>
                    <span className="text-muted-foreground">$2500.00</span>
                  </div>
                </div>

                <div className="pt-4 flex justify-center">
                  <Button
                    onClick={handleNextStep}
                  >
                    Place Order
                    <ArrowRight className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Step 2: Summary */
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-black">Order Summary</h2>
            </div>

            <div className="space-y-6">
              {/* Product Summary Item */}
              <div className="border rounded-2xl p-6 flex gap-6 bg-background shadow-sm">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden border shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=300&auto=format&fit=crop"
                    alt="Product"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h4 className="font-black text-base lg:text-lg">My T-shirt</h4>
                  <div className="flex flex-col text-sm text-muted-foreground font-medium">
                    <span>Color: White</span>
                    <span>QTY: 20 | $10.00 Jmd each</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="px-4 py-2 rounded-lg bg-muted text-xs font-black border">S 10</span>
                    <span className="px-4 py-2 rounded-lg bg-muted text-xs font-black border">L 10</span>
                  </div>
                </div>
              </div>

              {/* Detailed Breakdown */}
              <div className="space-y-4 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-bold text-sm lg:text-base">Subtotal (20 items) :</span>
                  <span className="font-black text-sm lg:text-base">$2000.00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-bold text-sm lg:text-base">Taxes :</span>
                  <span className="font-black text-sm lg:text-base">$50.00</span>
                </div>
                <div className="flex justify-between items-center text-destructive">
                  <span className="font-bold text-sm lg:text-base">Volume discount :</span>
                  <span className="font-black text-sm lg:text-base">-$50.00</span>
                </div>
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground font-bold text-sm lg:text-base">Shipping fee :</span>
                    <span className="text-[10px] lg:text-xs text-muted-foreground font-bold">Standard +$50</span>
                  </div>
                  <span className="font-black text-sm lg:text-base">$100.00</span>
                </div>
              </div>

              <div className="pt-6 border-t border-muted-foreground/10 flex justify-between items-center">
                <span className="font-black text-xl">Total Payable :</span>
                <span className="font-black text-xl">$100.00</span>
              </div>

              <div className="pt-6">
                <Button>
                  Proceed To Pay
                  <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ModalWrapper>
  );
}
