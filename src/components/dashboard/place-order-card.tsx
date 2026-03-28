import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PlaceOrderCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order on be-half of customer</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>
          Place order
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderCard;
