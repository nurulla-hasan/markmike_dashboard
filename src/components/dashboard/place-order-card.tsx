import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PlaceOrderCard = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order on be-half of customer</CardTitle>
      </CardHeader>
      <CardContent>
        <Button 
          onClick={() => navigate("/create-new-order")}
        >
          Place order
          <ArrowRight />
        </Button>
      </CardContent>
    </Card>
  );
};

export default PlaceOrderCard;
