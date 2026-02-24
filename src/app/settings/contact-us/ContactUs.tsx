import PageLayout from "@/components/common/page-layout";
import PageHeader from "@/components/ui/custom/page-header";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Save,
  Globe,
  Share2,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SuccessToast } from "@/lib/utils";

const contactSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const ContactUs = () => {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: "contact@mikefire.com",
      phone: "+1 (876) 123-4567",
      facebook: "https://facebook.com/mikefire",
      twitter: "https://twitter.com/mikefire",
      instagram: "https://instagram.com/mikefire",
      linkedin: "https://linkedin.com/company/mikefire",
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    console.log("Saving Contact Info:", data);
    SuccessToast("Contact information updated successfully (Fake)");
  };

  return (
    <PageLayout>
      <PageHeader
        title="Contact Settings"
        description="Update your business contact details and social media presence."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left Column: General Contact */}
            <div className="lg:col-span-5 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Globe />
                    <div className="space-y-1">
                      <CardTitle>Business Contact</CardTitle>
                      <CardDescription>
                        Direct ways for customers to reach you.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />{" "}
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Enter business email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />{" "}
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter phone number" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column: Social Media */}
            <div className="lg:col-span-7 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Share2 />
                    <div className="space-y-1">
                      <CardTitle>Social Profiles</CardTitle>
                      <CardDescription>
                        Manage links to your social media platforms.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="facebook"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Facebook className="h-4 w-4 text-muted-foreground" />{" "}
                            Facebook
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Facebook URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="twitter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Twitter className="h-4 w-4 text-muted-foreground" />{" "}
                            Twitter
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Twitter URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="instagram"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Instagram className="h-4 w-4 text-muted-foreground" />{" "}
                            Instagram
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Instagram URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="linkedin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />{" "}
                            LinkedIn
                          </FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="LinkedIn URL" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </PageLayout>
  );
};

export default ContactUs;
