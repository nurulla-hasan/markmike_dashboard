import { Trash2, Upload } from "lucide-react";
import PageLayout from "@/components/common/page-layout";
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

const FontManager = () => {
  const mockFonts = Array(5).fill({
    id: "1",
    name: "Montserrat",
  }).map((f, i) => ({ ...f, id: String(i + 1) }));

  return (
    <PageLayout>
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Font Manager"
          description="Manage and upload your custom fonts here."
        />
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <SearchInput placeholder="Search..." />
        </div>
      </div>

      <div className="space-y-6">
        {/* Add Font Section */}
        <Card>
          <CardHeader>
            <CardTitle>Add Font</CardTitle>
            <p className="text-sm text-muted-foreground font-normal">Upload Font</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              <div className="md:col-span-4 space-y-2">
                <p className="text-sm font-bold text-foreground">Font Name</p>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Type here..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="montserrat">Montserrat</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-5 space-y-2">
                <p className="text-sm font-bold text-foreground">Upload Font</p>
                <div className="relative group">
                  <label className="flex items-center gap-3 w-full h-9 px-3 border border-muted-foreground/20 rounded-md bg-white hover:bg-muted/5 transition-colors cursor-pointer">
                    <Upload className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Upload</span>
                    <input 
                      type="file" 
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="md:col-span-3">
                <Button 
                >
                  Add
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Fonts Grid */}
        <Card>
          <CardHeader>
            <CardTitle>Font</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {mockFonts.map((font) => (
                <div key={font.id} className="relative group aspect-square rounded-lg border bg-white flex flex-col items-center justify-center p-4">
                  <div className="absolute top-2 right-2">
                    <Button 
                      variant="ghost" 
                      size="icon-sm"
                      onClick={() => console.log("Delete font", font.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                  <div className="text-5xl font-bold mb-4">Aa</div>
                  <p className="text-sm text-muted-foreground font-medium">{font.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default FontManager;

