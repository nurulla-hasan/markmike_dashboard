/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import type { TCatalogFormValues } from "@/schemas/catalog.schema";

export function Web2PrintControls({ form }: { form: UseFormReturn<TCatalogFormValues, any> }) {
  // const templates = form.watch("defaultDesignTemplates") || [];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-bold">Web2Print & Design Controls</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="editorPermissions"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Editor Permissions</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="None (Locked)" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="None">None (Locked)</SelectItem>
                  <SelectItem value="Text Edit">Text Edit</SelectItem>
                  <SelectItem value="Full Edit">Full Edit</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>Default Design Template</FormLabel>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input placeholder="Select" className="pr-10" />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button 
              type="button" 
              variant="destructive"
            >
              Add
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="relative aspect-square rounded-md border bg-muted overflow-hidden group">
              <img src="/logo.png" alt="Template" className="h-full w-full object-contain p-2" />
              <div className="absolute top-1 right-1 bg-destructive text-white rounded-sm p-0.5 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
