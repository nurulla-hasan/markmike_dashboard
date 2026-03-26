/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";

interface MethodConstraintsSectionProps {
  form: UseFormReturn<any>;
}

export function MethodConstraintsSection({ form }: MethodConstraintsSectionProps) {
  const [newPosition, setNewPosition] = useState({ name: "", size: "", coordinates: "" });

  const addPosition = () => {
    if (newPosition.name && newPosition.size && newPosition.coordinates) {
      const current = form.getValues("printingPositions") || [];
      form.setValue("printingPositions", [...current, newPosition]);
      setNewPosition({ name: "", size: "", coordinates: "" });
    }
  };

  const removePosition = (index: number) => {
    const current = form.getValues("printingPositions") || [];
    form.setValue("printingPositions", current.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="space-y-8 py-6">
      <div className="space-y-1">
        <h3 className="text-xl font-bold text-foreground tracking-tight">Method Constraints</h3>
        <p className="text-sm text-muted-foreground font-medium">Printing Settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <FormField
          control={form.control}
          name="defaultMoq"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">Default MOQ</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-muted/30 h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leadTimeDays"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">Lead Time Days</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-muted/30 h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="setupFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">Setup Fee (JMD)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-muted/30 h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="maxColor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold text-base">Max Color</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter price"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  className="bg-muted/30 h-12"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Printing Position Form */}
      <Card className="shadow-none border-muted/20">
        <CardContent className="p-6 space-y-6">
          <h4 className="font-bold text-lg">Printing Position</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <FormLabel className="font-bold text-base">Name</FormLabel>
              <Input
                placeholder="Type here"
                value={newPosition.name}
                onChange={(e) => setNewPosition({ ...newPosition, name: e.target.value })}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <FormLabel className="font-bold text-base">Size</FormLabel>
              <Input
                placeholder="Type here"
                value={newPosition.size}
                onChange={(e) => setNewPosition({ ...newPosition, size: e.target.value })}
                className="bg-muted/30"
              />
            </div>
            <div className="space-y-2">
              <FormLabel className="font-bold text-base">Coordinates</FormLabel>
              <Input
                placeholder="Type here"
                value={newPosition.coordinates}
                onChange={(e) => setNewPosition({ ...newPosition, coordinates: e.target.value })}
                className="bg-muted/30"
              />
            </div>
            <Button
              type="button"
              onClick={addPosition}
              className="bg-destructive hover:bg-destructive/90 text-white font-bold h-12 text-lg rounded-lg"
            >
              +Add
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Printing Position Table */}
      <Card className="shadow-none border-muted/20 overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-muted/20 px-6 py-4 border-b">
            <h4 className="font-bold text-base">Printing position</h4>
          </div>
          <Table>
            <TableHeader className="bg-muted/10">
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-20 font-bold text-muted-foreground">#</TableHead>
                <TableHead className="font-bold text-muted-foreground text-center">Name</TableHead>
                <TableHead className="font-bold text-muted-foreground text-center">Size</TableHead>
                <TableHead className="font-bold text-muted-foreground text-center">Coordinates</TableHead>
                <TableHead className="text-right font-bold text-muted-foreground px-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {form.watch("printingPositions")?.map((pos: any, index: number) => (
                <TableRow key={index} className="hover:bg-muted/5 border-muted/10">
                  <TableCell className="font-medium px-6">{index + 1}</TableCell>
                  <TableCell className="text-center font-medium">{pos.name}</TableCell>
                  <TableCell className="text-center font-medium text-muted-foreground">{pos.size}</TableCell>
                  <TableCell className="text-center font-medium text-muted-foreground">{pos.coordinates}</TableCell>
                  <TableCell className="text-right px-6">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removePosition(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/5"
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {(!form.watch("printingPositions") || form.watch("printingPositions").length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10 text-muted-foreground font-medium">
                    No printing positions added yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
