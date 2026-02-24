import { Box, Calendar, Pencil } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export interface DigitizedLogo {
  id: string;
  image: string;
  name: string;
  count: number;
  date: string;
  price: number;
}

interface LogoCardProps {
  item: DigitizedLogo;
}

export function LogoCard({ item }: LogoCardProps) {
  return (
    <Card className="pt-0 overflow-hidden">
      <div className="relative h-50">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <CardContent className="space-y-3">
        <h3 className="font-semibold text-base text-foreground leading-tight">
          {item.name}
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground/60">
            <Box className="h-4 w-4" />
            <span className="text-sm font-medium">{item.count}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground/60">
            <Calendar className="h-4 w-4" />
            <span className="text-sm font-medium">{item.date}</span>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground/60">
            <Pencil className="h-4 w-4 rotate-0" />
            <span className="text-sm font-medium">{item.price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
