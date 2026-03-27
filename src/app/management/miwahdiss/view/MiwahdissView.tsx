import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    ArrowLeft,
    Calendar,
    Clock,
    Package,
    Star
} from "lucide-react";
import PageLayout from "@/components/common/page-layout";

const MiwahdissView = () => {
    // const { id } = useParams();
    const navigate = useNavigate();

    const products = [1, 2].map((i) => ({
        id: String(i),
        name: "Canvas Jersey T-shirt",
        price: "70.00",
        rating: 4.5,
        reviews: "1.5k+",
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=500&auto=format&fit=crop"
    }));

    return (
        <div className="max-w-4xl mx-auto">
            <PageLayout>
                {/* Header */}
                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft />
                    </Button>
                    <h1 className="text-xl font-bold text-foreground">Event Details</h1>
                </div>

                <div className="space-y-8">
                    {/* Event Summary */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <h2 className="text-3xl font-bold text-foreground">Independence Day 2026 🇯🇲</h2>
                            <Badge variant="success">Active</Badge>
                        </div>

                        <div className="flex flex-wrap gap-6 text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span className="text-sm font-medium">Event: August 6, 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                <span className="text-sm font-medium">Cut-off: August 6, 2026</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Package className="h-4 w-4" />
                                <span className="text-sm font-medium">6 products</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-foreground">Description</h3>
                            <p className="text-muted-foreground leading-relaxed max-w-3xl">
                                Celebrate Jamaica's Independence with custom print solutions, decorations, and merchandise.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-lg font-bold text-foreground">Hero Image</h3>
                            <div className="aspect-21/9 rounded-2xl overflow-hidden bg-muted">
                                <img
                                    src="https://images.unsplash.com/photo-1631857455684-a54a2f03665f?q=80&w=1170&auto=format&fit=crop"
                                    alt="Hero"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Catalog Section */}
                    <Card>
                        <CardContent className="space-y-6">
                            <h2 className="text-2xl font-bold text-foreground">Catalog</h2>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-foreground">Small Setup - Entrance Branding</h3>
                                        <p className="text-sm text-muted-foreground">Welcome your guests with professional signage and branding</p>
                                    </div>
                                    <Badge variant="secondary" className="bg-white border text-muted-foreground">2 items</Badge>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {products.map((product) => (
                                        <div key={product.id} className="space-y-3">
                                            <div className="aspect-square rounded-xl overflow-hidden bg-muted border">
                                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="space-y-1">
                                                <h4 className="font-bold text-foreground">{product.name}</h4>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Star className="h-3 w-3 fill-muted-foreground" />
                                                    <span className="font-bold text-foreground">{product.rating}</span>
                                                    <span>({product.reviews})</span>
                                                </div>
                                                <p className="text-destructive font-black">{product.price} JMD</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </PageLayout>
        </div>
    );
};

export default MiwahdissView;
