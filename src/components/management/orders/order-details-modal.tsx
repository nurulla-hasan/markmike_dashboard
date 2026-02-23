
import { ModalWrapper } from "@/components/ui/custom/modal-wrapper";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import type { TOrder } from "@/types/order.type";
import { ScrollArea } from "@/components/ui/scroll-area";
import { OrderStatusSelector } from "./order-status-selector";

type OrderDetailsModalProps = {
  order: TOrder;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenRejectSample?: () => void;
};

export const OrderDetailsModal = ({
  order,
  open,
  onOpenChange,
  onOpenRejectSample,
}: OrderDetailsModalProps) => {
  const showApprovalActions = order.status === "Awaiting Approval";
  const showCancelButton = order.status === "Pending";

  return (
    <ModalWrapper
      open={open}
      onOpenChange={onOpenChange}
      title="Orders Details"
    >
      <ScrollArea className="h-[70vh] whitespace-nowrap">
        <div className="space-y-6 p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2 text-sm">
              <p className="text-xs text-muted-foreground">#{order.orderId}</p>
              <div className="space-y-1">
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Placed on :</span>
                  <span className="font-medium text-foreground">
                    {order.placedOn}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Due Date :</span>
                  <span className="font-medium text-foreground">
                    {order.dueDate}
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-muted-foreground">Address :</span>
                  <span className="font-medium text-foreground">
                    {order.address}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <OrderStatusSelector status={order.status} />
            </div>
          </div>

          <div className="grid gap-1 text-sm">
            <div className="flex gap-2">
              <span className="text-muted-foreground">Payment :</span>
              <span className="font-medium text-foreground">
                {order.paymentLabel}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Delivery Option :</span>
              <span className="font-medium text-foreground">
                {order.deliveryMethod}
              </span>
            </div>
            <div className="flex gap-2">
              <span className="text-muted-foreground">Type :</span>
              <span className="font-medium text-foreground">{order.type}</span>
            </div>
          </div>

          <div className="border-y py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 rounded-md">
                  <AvatarImage
                    src={order.product.image}
                    alt={order.product.name}
                  />
                  <AvatarFallback className="rounded-md">
                    {order.product.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 text-sm">
                  <span className="font-medium text-foreground">
                    {order.product.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Price :{" "}
                    <span className="font-semibold">
                      ${order.product.basePrice.toFixed(2)}
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1 text-sm">
                <span className="text-muted-foreground">
                  Qty : {order.quantity}
                </span>
                {order.product.sizeInfo && (
                  <span className="text-xs text-muted-foreground">
                    {order.product.sizeInfo}
                  </span>
                )}
              </div>
            </div>
          </div>

          {order.designImages && order.designImages.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Design</p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {order.designImages.map((src, index) => (
                  <div
                    key={src + index}
                    className="flex flex-col items-center gap-2"
                  >
                    <div className="flex h-20 w-full items-center justify-center overflow-hidden rounded-md border bg-muted/40">
                      <img
                        src={src}
                        alt="Design"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {order.sampleImages && order.sampleImages.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Samples</p>
              <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
                {order.sampleImages.map((src, index) => (
                  <div
                    key={src + index}
                    className="flex h-20 w-full items-center justify-center overflow-hidden rounded-md border bg-muted/40"
                  >
                    <img
                      src={src}
                      alt="Sample"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-1 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium text-foreground">
                {order.subtotal.toFixed(2)}$
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Taxes</span>
              <span className="font-medium text-foreground">
                {order.taxes.toFixed(2)}$
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Volume discount</span>
              <span className="font-medium text-foreground">
                {order.volumeDiscount.toFixed(2)}$
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">
                Shipping Fee ( {order.deliveryMethod} )
              </span>
              <span className="font-medium text-foreground">
                {order.shippingFee.toFixed(2)}$
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-muted-foreground">Total :</span>
            <span className="text-destructive">{order.total.toFixed(2)}$</span>
          </div>

          {showApprovalActions && (
            <div className="space-y-3 border-t pt-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Cancellation Reason
                </p>
                <Textarea placeholder="I dont have money" />
              </div>
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive/5"
                  onClick={onOpenRejectSample}
                >
                  Reject
                </Button>
                <Button className="bg-destructive hover:bg-destructive/90">
                  Approved
                </Button>
              </div>
            </div>
          )}

          {showCancelButton && (
            <div className="flex justify-center border-t pt-4">
              <Button
                variant="outline"
                className="w-full max-w-xs border-destructive text-destructive hover:bg-destructive/5"
              >
                Cancel Order
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>
    </ModalWrapper>
  );
};
