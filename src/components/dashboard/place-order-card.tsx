import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const PlaceOrderCard = () => {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order on be-half of customer</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>
          <Link to="/create-new-order">
            Place order
          </Link>
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderCard;
