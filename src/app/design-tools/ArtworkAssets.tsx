import { Trash2, Upload } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
import { useParams } from "react-router-dom";
import PageHeader from "@/components/ui/custom/page-header";
import { SearchInput } from "@/components/ui/custom/search-input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { IArtworkAsset } from "@/types/artwork.type";

const ArtworkAssets = () => {
  const { id } = useParams();

  const mockAssets: IArtworkAsset[] = Array(6).fill({
    id: "1",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&auto=format&fit=crop&q=80",
    subCategoryId: id || "1"
  }).map((a, i) => ({ ...a, id: String(i + 1) }));

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <PageHeader
          title={"Tropical Bliss"}
          showBack
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput placeholder="Search..." />
        </div>
      </div>

      <div className="space-y-6">
        {/* Add Asset Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">Add Asset</CardTitle>
            <p className="text-sm text-muted-foreground font-normal">Upload Art or Design Asset</p>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <p className="text-sm font-bold text-foreground">Upload</p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
                {/* Custom File Upload Area (Dropzone style) */}
                <div className="md:col-span-3">
                  <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-muted-foreground/20 rounded-xl bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-3 rounded-full bg-muted/20 group-hover:bg-muted/30 transition-colors mb-3">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="mb-1 text-sm text-foreground font-medium">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        SVG, PNG, JPG or GIF (max. 800x400px)
                      </p>
                    </div>
                    <input type="file" className="hidden" />
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">Asset Type</p>
                    <Select defaultValue="image">
                      <SelectTrigger className="w-full h-10 border-muted-foreground/20">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="image">Image Asset</SelectItem>
                        <SelectItem value="svg">Vector Asset</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    variant="destructive"
                    className="w-full h-10 font-bold mt-auto"
                  >
                    Upload Asset
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assets Grid */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold">Asset</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {mockAssets.map((asset) => (
                <div key={asset.id} className="relative group aspect-square rounded-lg overflow-hidden border bg-muted/20">
                  <img
                    src={asset.image}
                    alt="Artwork Asset"
                    className="h-full w-full object-cover p-2"
                  />
                  <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                     <Button 
                        variant="ghost" 
                        size="icon-sm"
                        onClick={() => console.log("Delete asset", asset.id)}
                     >
                        <Trash2 className="h-3.5 w-3.5" />
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default ArtworkAssets;
