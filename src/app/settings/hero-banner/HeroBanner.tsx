import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { HeroBannerModal } from "@/components/settings/hero-banner/hero-banner-modal";
import { ConfirmationModal } from "@/components/ui/custom/confirmation-modal";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2 } from "lucide-react";

const DUMMY_BANNERS = [
  {
    id: "1",
    header: "New Summer Collection",
    description:
      "Experience the ultimate style with our new arrivals. Up to 50% off on selected items.",
    productId: "prod_1",
    image:
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "2",
    header: "Premium Accessories",
    description:
      "Elevate your look with our premium collection of watches, bags, and more.",
    productId: "prod_2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
  },
  {
    id: "3",
    header: "Modern Lifestyle",
    description:
      "Discover the perfect balance of comfort and elegance for your daily needs.",
    productId: "prod_3",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop",
  },
];

const HeroBanner = () => {
  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title="Hero Banner"
          description="Manage the content and images of the homepage hero banner"
        />
        <HeroBannerModal mode="add" />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {DUMMY_BANNERS.map((banner) => (
          <Card key={banner.id} className="pt-0 overflow-hidden group">
            <div className="relative aspect-video overflow-hidden">
              <img
                src={banner.image}
                alt={banner.header}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center gap-3">
                <HeroBannerModal
                  mode="edit"
                  initialData={banner}
                  trigger={
                    <Button
                      variant="secondary"
                      size="icon-lg"
                      className="rounded-full"
                    >
                      <Edit2 />
                    </Button>
                  }
                />
                <ConfirmationModal
                  title="Delete Banner"
                  description={`Are you sure you want to delete "${banner.header}"? This action cannot be undone.`}
                  onConfirm={() => console.log("Deleting banner:", banner.id)}
                  trigger={
                    <Button
                      variant="destructive"
                      size="icon-lg"
                      className="rounded-full"
                    >
                      <Trash2 />
                    </Button>
                  }
                />
              </div>
            </div>
            <CardContent className="space-y-3">
              <h3 className="text-lg font-bold text-foreground line-clamp-1">
                {banner.header}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {banner.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageLayout>
  );
};

export default HeroBanner;
