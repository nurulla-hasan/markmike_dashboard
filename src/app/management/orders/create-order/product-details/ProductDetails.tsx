import { useState } from "react";
import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Star, 
  Truck, 
  Zap, 
  Printer, 
  Upload, 
  Type, 
  Image as ImageIcon, 
  LayoutGrid, 
  UserPlus, 
  Undo2, 
  Redo2, 
  Plus,
  Maximize2
} from "lucide-react";
import { QuantityModal } from "@/components/management/orders/quantity-modal";
import { Label } from "@/components/ui/label";

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");

  const colors = [
    "#ffffff", "#000000", "#ff4d4f", "#ffccc7", "#ff7875", "#91d5ff", "#b7eb8f", "#52c41a", "#8c8c8c", "#d4b106", "#69c0ff"
  ];

  const sizes = ["S", "M", "L", "XL", "2XL", "3XL"];

  return (
    <PageLayout>
      <div className="space-y-8">
        <PageHeader title="Product details" showBack />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Images */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            <div className="flex flex-row md:flex-col gap-4 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-16 h-16 md:w-20 md:h-20 shrink-0 rounded-lg border border-border overflow-hidden cursor-pointer hover:border-primary transition-all">
                  <img 
                    src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop" 
                    alt="Product thumbnail" 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="flex-1 aspect-4/3 rounded-xl md:rounded-2xl overflow-hidden bg-muted">
              <img 
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop" 
                alt="Main product" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Canvas Jersey T-Shirt</h1>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">4.5</span>
                <span className="text-muted-foreground">(1.5k+)</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Free Delivery</p>
                      <p className="text-[10px] text-muted-foreground">Montego, Negril, Falmouth</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Truck className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Rush Delivery</p>
                      <p className="text-[10px] text-muted-foreground">Delivery within 26 January</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-start gap-2">
                    <Zap className="h-4 w-4 text-muted-foreground mt-1" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold">Super Rush Delivery</p>
                      <p className="text-[10px] text-muted-foreground">Delivery Within 23 January</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Button variant="outline" className="gap-2">
                <Printer className="h-4 w-4" />
                Printing
              </Button>
              <button className="block text-sm text-primary underline">Pricing Details</button>
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Color Family</Label>
              <div className="flex flex-wrap gap-3">
                {colors.map((c) => (
                  <div 
                    key={c}
                    onClick={() => setSelectedColor(c)}
                    className={`w-6 h-6 rounded border cursor-pointer transition-all ${selectedColor === c ? 'ring-2 ring-primary ring-offset-2' : 'border-border'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="font-bold">Available Size</Label>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <Button
                    key={s}
                    variant={selectedSize === s ? "default" : "outline"}
                    className="w-12 h-10 font-bold"
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </Button>
                ))}
                <span className="text-sm text-muted-foreground flex items-center ml-2">for "White" color</span>
              </div>
            </div>

            <div className="pt-2">
              <p className="font-bold">Minimum Quantity : 1</p>
            </div>
          </div>
        </div>

        {/* Fake Editor Section */}
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row min-h-125 lg:min-h-150">
              {/* Editor Sidebar */}
              <div className="w-full lg:w-20 bg-background border-b lg:border-b-0 lg:border-r flex flex-row lg:flex-col items-center justify-center lg:justify-start py-4 lg:py-6 gap-6 lg:gap-8 overflow-x-auto lg:overflow-x-visible">
                <div className="flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary shrink-0">
                  <Upload className="h-5 w-5" />
                  <span className="text-[10px] font-bold text-center">Upload</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary shrink-0">
                  <Type className="h-5 w-5" />
                  <span className="text-[10px] font-bold text-center">Add Text</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary shrink-0">
                  <ImageIcon className="h-5 w-5" />
                  <span className="text-[10px] font-bold text-center">Add Art</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary shrink-0">
                  <LayoutGrid className="h-5 w-5" />
                  <span className="text-[10px] font-bold text-center">Product Details</span>
                </div>
                <div className="flex flex-col items-center gap-1 cursor-pointer text-muted-foreground hover:text-primary shrink-0">
                  <UserPlus className="h-5 w-5" />
                  <span className="text-[10px] font-bold text-center">Add Names</span>
                </div>
              </div>

              {/* Editor Main Content Area */}
              <div className="flex-1 relative flex flex-col lg:flex-row">
                {/* Editor Tools Sub-Sidebar */}
                <div className="w-full lg:w-64 bg-background border-b lg:border-b-0 lg:border-r p-4 lg:p-8 space-y-8 lg:space-y-12 shrink-0">
                  <div className="space-y-4 lg:space-y-6 text-center">
                    <h3 className="font-bold text-base lg:text-lg">What's next for you?</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div className="space-y-2 flex flex-col items-center group cursor-pointer">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Upload className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] font-bold">Uploads</span>
                      </div>
                      <div className="space-y-2 flex flex-col items-center group cursor-pointer">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <Type className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] font-bold">Add Text</span>
                      </div>
                      <div className="space-y-2 flex flex-col items-center group cursor-pointer">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <ImageIcon className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] font-bold">Add Art</span>
                      </div>
                      <div className="space-y-2 flex flex-col items-center group cursor-pointer">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                          <LayoutGrid className="h-5 w-5 lg:h-6 lg:w-6 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <span className="text-[10px] font-bold">Change Products</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 lg:pt-12 border-t space-y-4 text-center hidden lg:block">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Uploading anytime is simple!</p>
                    <div className="space-y-3 text-[10px] font-medium text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Plus className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Drag and drop anywhere</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center">
                          <Plus className="h-2.5 w-2.5 text-primary" />
                        </div>
                        <span>Copy and paste from clipboard</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 bg-muted relative flex items-center justify-center p-6 lg:p-12 min-h-100">
                  <div className="absolute top-4 left-4 lg:top-6 lg:left-6 flex flex-col gap-2 z-10">
                    <Button variant="outline" size="icon" className="bg-background rounded-lg h-8 w-8 lg:h-10 lg:w-10">
                      <Undo2 className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="bg-background rounded-lg h-8 w-8 lg:h-10 lg:w-10 opacity-50">
                      <Redo2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="relative w-full max-w-sm lg:max-w-lg aspect-square">
                    <img 
                      src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop" 
                      alt="Canvas product" 
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* View Controls */}
                  <div className="absolute top-4 right-4 lg:top-6 lg:right-6 flex flex-col gap-2 lg:gap-3 z-10">
                    {['Front', 'Back', 'R.Sleeve', 'L.Sleeve'].map((view) => (
                      <div key={view} className="group cursor-pointer flex flex-col items-center gap-1">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg border-2 border-transparent group-hover:border-primary overflow-hidden bg-background">
                          <img 
                            src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop" 
                            alt={view} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-[8px] font-bold uppercase">{view}</span>
                      </div>
                    ))}
                    <div className="flex flex-col items-center gap-1 cursor-pointer pt-2 border-t border-muted-foreground/20">
                      <Maximize2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-[8px] font-bold uppercase">Zoom</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Action Bar */}
        <Card>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Button variant="outline">
                  + Add Products
                </Button>
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 rounded-lg border overflow-hidden">
                    <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop" alt="Selected product" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-12 h-12 rounded-lg border-2 border-primary overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=200&auto=format&fit=crop" alt="Selected product" className="w-full h-full object-cover" />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white">×</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row items-center gap-8 justify-center">
                <div className="flex flex-col">
                  <h4 className="font-bold">Canvas Jersey T-Shirt</h4>
                  <button className="text-[10px] text-primary underline text-left">Change product</button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Quantity</span>
                    <span className="font-bold">0</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold">Total price</span>
                    <span className="font-bold">0.00 JMD</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <QuantityModal  />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ProductDetails;
